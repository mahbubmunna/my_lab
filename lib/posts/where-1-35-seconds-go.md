---
title: "Where 1.35 seconds go in a local voice agent"
date: "2026-10-12"
summary: "I timed every step of Mama Desk, my clinic voice agent that runs fully on local models. The slowest part was never the LLM. First it was the voice, and now it's the silence."
tags: ["Voice AI", "Latency", "Local LLM", "Whisper", "Kokoro"]
meter: "1.35 s"
---

On a phone call, one second of silence feels long. Two seconds feels like the line dropped. If you build voice agents, this is the number that decides whether people talk to your agent or hang up on it.

I'm building [Mama Desk](/projects/mama-desk), a front-desk voice agent for clinics. It answers calls, does patient intake, flags urgent cases for staff, and books real calendar slots. Everything runs locally on one consumer GPU: Whisper listens, Llama 3.1 8B thinks, Kokoro speaks. There are no cloud AI APIs anywhere in the loop.

Running everything locally is a choice with a price. You get privacy and zero per-minute cost. You pay for it in latency, and you can't hide behind someone else's infrastructure. So I timed every step. This post is what I found, including the two things that surprised me.

## What "latency" means in a voice agent

People measure voice latency in different ways, so here is the one I use:

> **The wait** starts when the caller stops talking and ends when they hear the first sound of the reply.

Not when the full answer is generated. Not when the audio file is finished. The caller doesn't care about either of those. They care about the silence.

For Mama Desk, that wait is **1 to 1.8 seconds** today, depending on the turn. A typical turn looks like this:

| Step | What happens | Time |
|---|---|---|
| Listen | Wait to be sure the caller finished talking | ~500 ms |
| Hear | Whisper turns the speech into text | ~150 ms |
| Look up | Find the right clinic info (RAG) | ~50 ms |
| Think | Llama 3.1 8B writes the first sentence | ~400 ms |
| Speak | Kokoro produces the first audio | ~250 ms |
| **Total** | | **~1.35 s** |

Some of these are measured ranges, and some are my best estimates inside a measured total. Whisper takes 100 to 200 ms. The first token from Llama arrives in 100 to 200 ms on an RTX 5060 Ti. Kokoro's first audio takes 200 to 300 ms. The lookup runs in a few tens of milliseconds, so I show it as about 50. The "Think" row is the first token plus the time to finish the first sentence, which matters for a reason I'll get to.

Now the two surprises.

## Surprise one: the slowest part was the voice

Most people assume the LLM is the slow part of a voice agent. It's the biggest model and the most expensive step, so it must be the bottleneck.

In my first version, it wasn't even close. The slowest step was Kokoro, the text-to-speech model, because it was running on the CPU. It took **3 to 5 seconds** just to start speaking. Everything else in the pipeline could have been instant and the call would still have felt broken.

The fix was not clever. I moved Kokoro onto the GPU using its ONNX build. First audio dropped to **200 to 300 ms**. That is roughly 10 to 20 times faster, from one deployment change.

Why did it happen in the first place? Because TTS feels like the "easy" part. You get the model working, it sounds good, and you move on to the interesting problems: retrieval, prompts, agent logic. Nobody profiles the step that already works. That's exactly why it was the problem.

The general lesson is boring and important: **don't guess where the delay is. Time every step.** My method was nothing fancy: plain logs, added on purpose at each boundary in the pipeline. For example: end of speech detected, transcript ready, retrieval done, first token, first sentence complete, first audio chunk sent. Once you have timestamps like these for every turn, the slow step usually names itself. No profiler or tracing platform needed to start.

## The cold start

There was a second problem hiding behind the first one. The first call after starting the server was always slow, much slower than every call after it.

The GPU was cold. A first request typically pays for one-time setup work, like loading weights onto the card and allocating memory, that every later request gets for free.

In a demo you never notice, because you test the second call. In a real clinic, the first caller of the morning is a real patient.

The fix: the backend warms up the models when it starts, so the first real caller gets the same speed as everyone else.

If you run models yourself, add a warm-up step. It costs a few seconds at startup and saves your first user from the worst experience of the day.

## Surprise two: now the slowest part is silence

Once the voice was fast, I looked at the breakdown again. The biggest single chunk is no longer any of the AI steps. It's the **~500 ms of silence** the agent waits for before deciding the caller has finished talking.

This is called endpointing, and it's a genuinely hard trade-off:

- **Wait too long**, and every reply starts late. The caller feels the gap on every single turn.
- **Wait too little**, and the agent jumps in when someone pauses to think, mid-sentence. "I'd like to book an appointment for... Tuesday" becomes two turns, and the agent answers the first half.

Half a second is a reasonable middle. But it means that on a typical turn, more than a third of the wait is the agent doing nothing on purpose.

### How Mama Desk decides you're done

The way you detect the end of a turn matters as much as how long you wait. Mama Desk does it in the caller's browser, not on the server.

The detector is energy-based. While the caller talks, the browser's audio API reports how loud the microphone signal is, frame by frame, as an RMS (root mean square) level. Speech pushes that level up. When it stays below a threshold for about 500 ms, the browser decides the turn is over and the server starts processing.

The common alternative is a model-based voice activity detector, like Silero, running on the server. It listens to the audio and classifies each slice as speech or not speech.

Doing it client-side has real advantages:

- **It costs the server nothing.** My GPU is already shared by Whisper, the LLM and Kokoro. A detector that runs on the caller's device takes no capacity from any of them.
- **The decision happens where the audio is.** The browser hears the silence first, so it can call the end of the turn without waiting on a round trip to the server.
- **It's simple.** An energy threshold is a few lines of code, easy to reason about and easy to tune.

It also has limits, and they're worth knowing before you copy it:

- **Loudness is not speech.** An energy detector measures volume, not voice. Steady background noise, like a TV in a waiting room, can keep the level above the threshold so the turn never seems to end. A quiet speaker can fall below it too early.
- **It can't tell a pause from an ending.** Silence after "my number is" and silence after "thank you" look exactly the same to an energy meter.
- **The threshold depends on the room.** A level that works with a headset may not work on a laptop mic in a busy reception.

A model-based detector handles the first problem better, because it's trained to tell voices from noise, at the cost of running on every slice of audio. None of these approaches solves the second problem, though. Telling a pause from an ending needs some sense of what was said.

That's an important thing to know, because it changes where you spend effort. Shaving 50 ms off the LLM is real work and barely moves the total. Getting smarter about when the caller has finished (using the content of the sentence, not only the silence) could save hundreds of milliseconds. That's the next problem I want to solve.

## Think: first token is not the number that matters

For the LLM step, the number everyone quotes is time to first token. Mine is 100 to 200 ms on an RTX 5060 Ti running Llama 3.1 8B in 8-bit.

But a voice agent can't speak a single token. Kokoro needs a sentence, or at least a phrase, to produce natural audio. So the number that actually matters is **time to first speakable sentence**. That's why the "Think" row in the table is about 400 ms, not 150.

A few things help here:

- **Keep the first sentence short.** A reply that opens with "Sure, let me check that for you." starts speaking much sooner than one that opens with a 30-word sentence. This is a prompt decision, and it's one of the cheapest latency wins there is.
- **Use a model size that fits.** I run 8B in 8-bit, chosen so everything fits on one GPU with headroom: Whisper, the LLM and its KV cache, and Kokoro all share the card. A bigger model that pushes something else off the GPU can make the whole pipeline slower, even if its answers are better.
- **Better hardware helps, but less than you'd think.** On larger production GPUs, first tokens come faster. In a production setup on a 24 GB card with the same model, I saw first tokens around 156 ms. It's a nice gain, but it doesn't fix a slow voice or a long endpointing wait.

## Streaming is what makes the numbers add up

If each step waited for the previous one to fully finish, the wait would be much longer than 1.35 seconds. The full answer might take a few seconds to generate, and the full audio a few more.

What keeps the wait short is streaming:

1. Whisper works on audio as it arrives, so after the end of the turn it needs only 100 to 200 ms to finish the transcript.
2. The LLM's answer streams out in chunks over a WebSocket as it's generated.
3. As soon as the first sentence is complete, it goes to Kokoro. The agent starts talking while the rest of the answer is still being written.

So the wait the caller feels is the time to the **first** sentence and the **first** audio, not to the whole reply. The rest of the generation happens while the agent is already speaking.

This also explains why a slow TTS was so damaging. Streaming hides a slow total generation time behind speech. It cannot hide a slow first audio chunk, because that chunk is exactly what the caller is waiting for.

## What I'd tell someone building their first voice agent

If you take one thing from this post, make it the first item on this list:

1. **Time every step, per turn, from the start.** Log a timestamp at each boundary. You can't fix what you haven't measured, and your guess about the slow step is probably wrong.
2. **Measure the wait the caller feels:** end of speech to first audio. Not total generation time.
3. **Check where your TTS runs.** If it's on CPU, that's likely your biggest win.
4. **Warm up your models at startup.** Your first caller deserves the same speed as your hundredth.
5. **Stream everything,** and start speaking after the first sentence.
6. **Make the first sentence short.** It's a prompt change, and it's free.
7. **Respect the endpointing trade-off.** It may be your biggest chunk once everything else is fast. And decide deliberately where end-of-turn detection runs: on the caller's device, or on your server.
8. **Don't size the model alone.** Fit the whole pipeline on the GPU first, then pick the biggest model that still leaves room.

## Where this goes next

Today Mama Desk answers in 1 to 1.8 seconds on one gaming GPU, with no cloud APIs. My next target is around 600 ms.

The arithmetic says where it has to come from. The AI steps together are roughly 850 ms on a typical turn, and the silence wait is 500. Getting to 600 means working on both: smarter end-of-turn detection so the agent doesn't wait a fixed half second, and a shorter path to the first speakable sentence.

I'll write about what works when I get there. If you're building a voice agent and fighting the same numbers, I'd like to hear which step is slowest for you.
