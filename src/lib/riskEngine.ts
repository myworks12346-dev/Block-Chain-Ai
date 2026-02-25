import { Transaction, RiskAnalysis, TransactionContext } from '../types';
import { ethers } from 'ethers';

export function calculateRisk(tx: Transaction): RiskAnalysis {
  let score = 0;
  
  // High value transfer (> 1 ETH)
  const valueInEth = parseFloat(ethers.formatEther(tx.value));
  if (valueInEth > 1) score += 40;
  
  // Unknown contract interaction (to is not null and value is 0 often means contract call)
  if (tx.to && valueInEth === 0) score += 20;
  
  // Gas unusually high (arbitrary threshold for MVP)
  const gasUsed = BigInt(tx.gasUsed);
  if (gasUsed > 200000n) score += 20;
  
  // First interaction with address - would need history, but for MVP we'll mock or simplify
  // Let's just use a random component for "newness" or skip for now to be deterministic
  
  const level = score > 70 ? 'High' : score > 30 ? 'Medium' : 'Low';
  
  return { score: Math.min(score, 100), level };
}

export function classifyTransaction(tx: Transaction): TransactionContext {
  const valueInEth = parseFloat(ethers.formatEther(tx.value));
  
  if (tx.to && valueInEth > 0 && tx.from !== tx.to) {
    return 'Token Transfer';
  }
  
  // Simplified classification for MVP
  if (tx.to && valueInEth === 0) {
    return 'DeFi Interaction';
  }
  
  return 'Unknown';
}
