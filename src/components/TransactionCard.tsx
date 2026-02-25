import React, { useState } from 'react';
import { TransactionRecord } from '../types';
import { Shield, AlertTriangle, Info, ChevronDown, ChevronUp, ExternalLink, Sparkles, Volume2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ethers } from 'ethers';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { simplifyText, generateSpeech } from '../lib/gemini';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TransactionCardProps {
  tx: TransactionRecord;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ tx }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [simplifiedExplanation, setSimplifiedExplanation] = useState<string | null>(null);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-green-400 bg-green-400/10 border-green-400/20';
    }
  };

  const handleSimplify = async () => {
    if (simplifiedExplanation || isSimplifying) return;
    setIsSimplifying(true);
    try {
      const text = tx.aiExplanation?.explanation || "";
      const simplified = await simplifyText(text);
      setSimplifiedExplanation(simplified);
    } catch (error) {
      console.error('Simplify error:', error);
    } finally {
      setIsSimplifying(false);
    }
  };

  const handleSpeak = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      const text = simplifiedExplanation || tx.aiExplanation?.explanation || "No explanation available.";
      const base64 = await generateSpeech(text);
      if (base64) {
        const audio = new Audio(`data:audio/mp3;base64,${base64}`);
        audio.onended = () => setIsSpeaking(false);
        audio.play();
      } else {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error('Speak error:', error);
      setIsSpeaking(false);
    }
  };

  return (
    <motion.div 
      layout
      className="glass-card overflow-hidden transition-all hover:bg-white/10"
    >
      <div 
        className="p-4 cursor-pointer flex flex-wrap items-center justify-between gap-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            "p-2 rounded-lg",
            tx.risk.level === 'High' ? "bg-red-500/20" : "bg-purple-500/20"
          )}>
            <Shield className={cn(
              "w-6 h-6",
              tx.risk.level === 'High' ? "text-red-400" : "text-purple-400"
            )} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-gray-400">
                {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
              </span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                getRiskColor(tx.risk.level)
              )}>
                {tx.risk.level} Risk
              </span>
            </div>
            <div className="text-lg font-bold">
              {ethers.formatEther(tx.value)} ETH
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-gray-500 uppercase tracking-widest">Context</div>
            <div className="text-sm font-medium text-blue-400">{tx.context}</div>
          </div>
          {isExpanded ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 bg-black/20"
          >
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Info className="w-3 h-3" /> AI Analysis
                    </h4>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleSimplify(); }}
                        disabled={isSimplifying}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                      >
                        {isSimplifying ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                        Simplify
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleSpeak(); }}
                        disabled={isSpeaking}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                      >
                        {isSpeaking ? <Loader2 className="w-3 h-3 animate-spin" /> : <Volume2 className="w-3 h-3" />}
                        Listen
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300 leading-relaxed">
                      {tx.aiExplanation?.explanation || "Analyzing transaction details..."}
                    </p>
                    {simplifiedExplanation && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm italic"
                      >
                        <div className="flex items-center gap-2 mb-1 text-[10px] font-bold uppercase text-purple-400">
                          <Sparkles className="w-3 h-3" /> Simplified
                        </div>
                        {simplifiedExplanation}
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Shield className="w-3 h-3" /> Suggestion
                  </h4>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
                    {tx.aiExplanation?.suggestion || "Preparing safety recommendation..."}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="text-xs text-gray-500">
                  Block Time: {new Date(tx.blockTimestamp * 1000).toLocaleString()}
                </div>
                <a 
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View on Etherscan <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
