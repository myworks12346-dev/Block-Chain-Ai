import { GoogleGenAI } from "@google/genai";
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
