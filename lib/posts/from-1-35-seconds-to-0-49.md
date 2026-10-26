---
title: "From 1.35 seconds to 0.49: what changed in my voice agent"
date: "2026-10-26"
summary: "Two weeks ago my clinic voice agent took 1.35 seconds to answer. In my test runs it now answers in 0.49. The AI didn't get much faster. It just stopped waiting."
tags: ["Voice AI", "Latency", "Local LLM", "AI Agents"]
meter: "0.49 s"
---

Two weeks ago I wrote about [where 1.35 seconds go](/blog/where-1-35-seconds-go) in Mama Desk, the front-desk voice agent I'm building for clinics. I ended that post with a goal: around 600 ms.

This is the follow-up. In my test runs, the median wait is now **0.49 seconds**, down from 1.37. On a real call with my own voice, the on-screen timer read **0.53 to 0.71 seconds** on every turn. Timed by ear from the recording, it's **0.7 to 1.1 seconds**, down from 1.4 to 2.1. So about half of what it was, any way you measure it.

I'll explain all three numbers, because they don't agree, and that disagreement taught me as much as the speed-up did.

Same setup as before: one gaming GPU at home, no cloud AI APIs. I'm keeping the exact recipe to myself for now. This post is about how I found the time, not the code that took it back.

## Quick recap: what "the wait" means

The wait starts when the caller stops talking and ends when they hear the first sound of the reply. That's the silence a caller feels. Nothing else counts.

In the first post, my 1.35 seconds was a typical turn built from a table: about 500 ms waiting to be sure the caller was done, then speech-to-text, a lookup, the model writing its first sentence, and the voice starting. Some rows were measured. Some were my best estimates inside a measured total.

That table was useful. It was also the first thing I had to throw away.

## Step one: I stopped trusting my own table

After the first post, a lot of people sent ideas in the comments. Most were about speech-to-text, and some threads turned into real brainstorming. I tried many of them, and the per-step numbers got better.

Then I recorded a real call and timed the gaps from the audio. Caller's last sound to the agent's first sound. The gaps were **1.4 to 2.1 seconds, typically about 1.7**.

My step numbers added up to far less than that. Somewhere, 0.3 to 0.8 seconds per turn was missing. My logs couldn't see it, because each log only measured its own step.

So I rebuilt the measurement before touching anything else:

- **One clock for the whole turn.** The browser and the server each mark their own moments, and the two clocks are synced, so every turn has one timeline from "caller's last speech" to "first audible sound".
- **A timer on screen.** Every turn shows its wait under the agent's name. If a turn feels slow, I can see the number right away instead of guessing.
- **A repeatable caller.** A scripted voice talks to the agent through a fake microphone, 20 turns at a time. Same words, same pauses, every run. That makes before-and-after comparisons fair.

The first honest baseline, 20 turns: **median 1.37 seconds, worst 5% at 2.02 seconds, and zero turns under 800 ms.** The median matched my old table almost exactly. The worst turns did not.

## Where the missing time was hiding

With every stage on one timeline, the missing time showed up quickly. It wasn't the network. Sending audio and decoding it took about 15 ms together.

It was a habit in my own pipeline. The agent waited until the **whole first sentence** was written, then turned all of it into audio, then played it. On a short opener that's fine. On a long one, the voice step alone could take most of a second. There was also a little silence baked into the start of every audio clip, about 50 ms, which nobody hears as silence but everyone feels as delay.

The first fix was simple to describe: start speaking at the first natural break in the sentence, not at the full stop.

The worst turns improved a lot. The worst 5% went from **2.02 to 1.64 seconds**. The median didn't move at all: 1.37 before, 1.40 after.

That was a useful lesson on its own. Slow worst cases and a slow typical case are different problems. Fixing one tells you nothing about the other. If I had only watched the median, I'd have thrown away a good fix. If I had only watched the worst case, I'd have declared victory too early.

## The real shift: the AI was never the slow part

Here's what the timeline made obvious once I stopped looking at steps one by one.

The biggest single chunk of every turn was the agent **waiting to be sure the caller had finished**. About half a second of silence, on every turn, before anything else started. During that half second, the GPU did nothing.

I wrote in the first post that endpointing was a hard trade-off: wait too long and every reply feels slow, cut in too early and you interrupt people. I still believe that. But I was treating the wait and the work as two things that had to happen one after the other.

They don't. Now the agent starts working the moment I pause. It only speaks once it's sure I'm done. If I keep talking, it drops what it prepared and listens again. Nothing real, like a booking, happens until it's sure the turn is over.

That's as far as I'll go on the how, for now.

What I can share is what it did to the numbers. Here's the median across the changes, all on the same 20-turn script:

| Change | Median wait |
|---|---|
| Baseline | 1.40 s |
| Start working during the pause | 1.09 s |
| Stop re-fetching facts that don't change between turns | 0.75 s |
| Don't wait for a decision the turn doesn't need | 0.71 s |
| Speak at the first natural break | 0.67 s |

Those numbers include about 178 ms that the fake speaker in my test browser adds on its own, which a real speaker doesn't. Without it, the run came out at **median 0.49 seconds, worst 5% at 0.64, and the slowest turn at 0.69**.

The part I like most: on 14 of the 20 turns, the wait was the end-of-turn pause plus about 10 ms. The work had already finished inside the pause. On those turns, the agent answers as soon as it's allowed to.

## The small things that add up

A few changes didn't move the median much on their own, but you can hear them:

- **A short first phrase.** Opening with something like "Of course," gets sound out while the rest of the reply is still being made. I mentioned this in the first post as a prompt trick. It matters even more now.
- **Say the slow part out loud.** When a turn has to book something, the agent says "Perfect, let me book that for you." right away. The caller hears an answer, not a pause.
- **No silence at the start of a clip.** Those 50 ms are gone from every reply.
- **Gapless playback.** Replies are played as one smooth stream, not as separate clips with tiny holes between them.
- **A cough doesn't cut the agent off.** When the caller makes a sound, the agent's voice gets quieter at once, and only stops when it's clearly speech. Before, a cough or a breath could end its sentence.

None of these are clever. All of them are things a caller notices without knowing why.

## Test runs are not calls

A scripted voice on the same machine is great for comparing changes. It's not a real call. So I made one: my own voice, real speakers, one full booking, no cuts.

The on-screen timer read: **0.53, 0.57, 0.70, 0.56, 0.65, 0.65, 0.71, 0.54 seconds**. Every turn under 800 ms. Typical turn about 0.61. Half the turns beat my 600 ms goal.

Then I timed the same recording from the audio, the way a listener would. **0.70 to 1.10 seconds, median about 0.84.** The same check on the call from a few days earlier gave 1.4 to 2.1.

So the timer and my ears disagree, by 0.16 to 0.40 seconds per turn. The gap is biggest on the turn where I read out a phone number and my last words were quiet and broken up. That suggests two things are going on: the timer starts from where the software thinks I stopped, which isn't always my last real sound, and it stops a bit before the sound actually leaves the speakers.

I could quote only the timer. It's the nicer number. But a caller doesn't hear the timer. Making the timer agree with the audio, within about 50 ms, is the next job before I record anything else.

## What it costs

This speed has a price, and I want to be honest about it.

People don't always stop when they pause. Sometimes I take a breath and keep going. When that happens, the GPU work the agent did during my pause gets thrown away. The earlier it starts, the faster the reply, and the more work it wastes. So now I'm measuring how much GPU each turn really costs, to find the right balance.

And it got one turn wrong. On the real call I said "Please", paused to think, and the agent decided I was done. It replied, "I think you might have gotten a bit cut off." Polite, but wrong. A pause in the middle of a sentence and a pause at the end still sound the same to anything that only listens to silence. Fixing that without slowing down short answers like "Yes" is the other open problem.

## What I'd do differently

1. **Measure the whole turn on one clock from day one.** Per-step logs told me which step was slow. They couldn't tell me about time that fell between the steps, and that's where a third of a second was hiding.
2. **Check against the audio early.** Timing a real recording by ear is crude, but it's the number the caller lives with. It caught a gap my own logs said didn't exist.
3. **Build the repeatable caller first.** Before it, every change was "feels faster". After it, every change had a number, and some "obvious" wins turned out to do nothing.
4. **Look at the wait as time, not as a rule.** For a long time I treated the end-of-turn pause as a fixed cost to shrink. The bigger win came from asking what the system could do during it.

## A checklist if your voice agent feels slow

1. Define the wait as the caller hears it: their last sound to your first sound.
2. Put every stage of a turn on one timeline, browser and server together.
3. Show the wait on screen during testing, per turn.
4. Make a scripted caller and run the same 20 turns before and after every change.
5. Track the median and the worst 5% separately. They have different causes.
6. Look for waiting, not just slow steps. Waiting for a full sentence, waiting for a decision you don't need yet, waiting for silence.
7. Trim silence from the start of every audio clip.
8. Open replies with a short phrase, and say slow actions out loud.
9. Test with a real person on real speakers before you quote a number.
10. If you start work early, measure what it wastes.

## Where this goes next

Two weeks ago Mama Desk took 1.35 seconds to answer. Today it's 0.49 in my test runs and well under a second on a real call, still on one gaming GPU with no cloud. The models are about as fast as they were. Most of the win came from the agent no longer standing around.

Next: make the on-screen timer match what a listener hears, stop the agent from answering a sentence I haven't finished, and put a number on the GPU it wastes. Then I'll record a new call and show the whole thing.

If you're building voice agents, I'd like to know how you handle the same trade-off. Do you start early and waste some compute, or wait and lose speed?
