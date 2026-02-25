import React from 'react';
import { Wallet, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface WalletConnectProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect, isConnecting }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
      >
        Understand Every <br /> Blockchain Transaction.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-lg mb-10 max-w-2xl"
      >
        Context Wallet uses advanced AI to decode complex blockchain data, 
        providing you with clarity and security for every move you make.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onConnect}
        disabled={isConnecting}
        className="neon-glow group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Wallet className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        )}
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </motion.button>
    </div>
  );
};
