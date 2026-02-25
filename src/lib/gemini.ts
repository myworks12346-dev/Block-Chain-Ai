import { GoogleGenAI, Modality } from "@google/genai";
import { Transaction, AIExplanation } from "../types";
import { ethers } from "ethers";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function analyzeTransaction(tx: Transaction): Promise<AIExplanation> {
  const prompt = `
    Analyze this Ethereum transaction:
    Hash: ${tx.hash}
    From: ${tx.from}
    To: ${tx.to}
    Value: ${ethers.formatEther(tx.value)} ETH
    Gas Used: ${tx.gasUsed}
    Timestamp: ${new Date(tx.blockTimestamp * 1000).toLocaleString()}

    You are a blockchain security analyst.
    Explain this transaction in simple language.
    Include:
    - What happened
    - Why it matters
    - Risk summary
    - Recommended action
    Avoid technical jargon.
    Keep it short and clear.
    Return the response in JSON format with keys "explanation" and "suggestion".
  `;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      explanation: result.explanation || "No explanation available.",
      suggestion: result.suggestion || "No suggestion available.",
    };
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      explanation: "Failed to analyze transaction with AI.",
      suggestion: "Please verify manually on Etherscan.",
    };
  }
}

export async function simplifyText(text: string): Promise<string> {
  const prompt = `
    Simplify the following blockchain transaction explanation for a non-technical person. 
    Use very simple English, avoid any technical terms, and make it extremely easy to understand.
    
    Explanation to simplify:
    ${text}
    
    Simplified Version:
  `;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "Failed to simplify text.";
  } catch (error) {
    console.error("Simplify Error:", error);
    return "Could not simplify the explanation at this time.";
  }
}

export async function generateSpeech(text: string): Promise<string | null> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Zephyr' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
}

export async function chatWithAI(message: string, context: string): Promise<string> {
  const prompt = `
    You are Context Wallet AI, a helpful blockchain assistant. 
    The user is asking a question about their wallet or transactions.
    
    Context (User's Wallet/Transactions):
    ${context}
    
    User Question:
    ${message}
    
    Provide a helpful, clear, and safe response.
    IMPORTANT: Write in plain English, like a human typing in a chat. 
    DO NOT use any Markdown formatting like bold (**), italics (*), or headers (#).
    Keep the tone conversational and friendly.
  `;

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later.";
  }
}
