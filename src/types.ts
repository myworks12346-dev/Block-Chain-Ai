export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  blockTimestamp: number;
}

export interface RiskAnalysis {
  score: number;
  level: 'Low' | 'Medium' | 'High';
}

export type TransactionContext = 'Token Transfer' | 'Contract Approval' | 'DeFi Interaction' | 'NFT Interaction' | 'Unknown';

export interface AIExplanation {
  explanation: string;
  suggestion: string;
}

export interface TransactionRecord extends Transaction {
  risk: RiskAnalysis;
  context: TransactionContext;
  aiExplanation?: AIExplanation;
}
