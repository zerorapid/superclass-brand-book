/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Use Vite environment variable (cast to any to avoid TS error if types are missing)
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateBrandContent(prompt: string) {
  try {
    if (!apiKey) {
      console.warn("Gemini API Key missing. Please set VITE_GEMINI_API_KEY in .env.local");
      return null;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const fullPrompt = `You are a professional brand strategist. ${prompt}. Keep the response concise, professional, and impactful. Return only the generated text.`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text() || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}

export async function generateBrandImage(prompt: string, aspectRatio: "1:1" | "16:9" | "4:3" | "3:4" = "1:1") {
  try {
    if (!apiKey) {
      console.warn("Gemini API Key missing. Please set VITE_GEMINI_API_KEY in .env.local");
      return null;
    }

    // Note: Standard Gemini 1.5 doesn't generate images directly in the same way.
    // This is a placeholder for where you would integrate Imagen 3 or similar.
    // For now, we will use a fallback or specific model if available.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Attempting to generate image data if supported by the specific model variant
    // In many environments, this would call a separate Image Generation API.
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `Generate a high quality image based on this description: ${prompt}. Aspect ratio: ${aspectRatio}. Return only the image data.` }] }],
    });

    const response = await result.response;
    
    // In actual implementations with image support, you would check for inlineData
    // parts. For now, we'll log that this is a placeholder unless using a specific image model.
    console.log("Image generation requested for:", prompt);
    
    // This is where the base64 data would be extracted if the model supported it.
    // Since standard gemini-1.5-flash is text-to-text/multimodal-to-text,
    // real image generation would typically use a dedicated service.
    
    return null;
  } catch (error: any) {
    console.error("Gemini Image Error Details:", error);
    return null;
  }
}
