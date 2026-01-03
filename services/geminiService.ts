
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getGeminiResponse = async (prompt: string, history: { role: string; content: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const formattedContents = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  // Add the current message
  formattedContents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: formattedContents,
    config: {
      systemInstruction: `You are 'EverGreen AI', a friendly and professional landscaping consultant for 'EverGreen Landscapes'. 
      Your goals:
      1. Provide expert advice on garden design, plant choice, and lawn care.
      2. Briefly mention our services: Hardscaping, Garden Design, Seasonal Maintenance, and Smart Irrigation.
      3. Encourage users to 'Visualize' their ideas using our built-in tool.
      4. If users ask about pricing, explain it depends on scale but offer typical ballpark ranges.
      5. Stay professional, nature-focused, and helpful. Keep responses concise but insightful.`,
    }
  });

  return response.text;
};

export const generateGardenVisual = async (description: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A photorealistic, high-end professional landscaping design of: ${description}. Professional photography, lush greenery, perfect lighting, 4k resolution.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
