
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export async function generateResponse(prompt: string): Promise<string> {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return "API key is not configured. Please set the API_KEY environment variable.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });

    const text = response.text;
    if (text) {
      return text;
    } else {
      return "I couldn't generate a response. Please try again.";
    }
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred: ${error.message}. Please check your API key and network connection.`;
    }
    return "An unknown error occurred while contacting the AI model.";
  }
}
