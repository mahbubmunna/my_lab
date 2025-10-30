'use server';

import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client. It automatically uses the GEMINI_API_KEY
// environment variable if set.
const ai = new GoogleGenAI({});

/**
 * Summarizes the given text content using the Gemini model.
 * * @param content The text to summarize (a user's note).
 * @returns The summarized text.
 */
export async function summarizeNote(content: string): Promise<string> {
  // CRUCIAL: Designates this function to run only on the server

  if (!content || content.length < 50) {
    return 'Please enter a longer note (minimum 50 characters) to generate a useful summary.';
  }

  try {
    const prompt = `You are a concise summarization expert. Summarize the following note, keeping all key facts and technical terms. Max 3 sentences: \n\nNOTE: """${content}"""`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Fast and capable model for text tasks
      contents: prompt,
    });

    return (
      response.text?.trim() ||
      'Sorry this time, No Summary From AI, please try again later'
    );
  } catch (error) {
    console.error('AI Summarization Error:', error);
    return 'Error processing summary. Check your API key and server logs.';
  }
}
