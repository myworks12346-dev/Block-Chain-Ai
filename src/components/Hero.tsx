import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Wallet, ArrowRight } from 'lucide-react';

interface HeroProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onConnect, isConnecting }) => {
  return (
    <div className="relative pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            AI-Powered Wallet Intelligence is Here
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent tracking-tight"
          >
            Understand Every <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Blockchain Transaction.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Stop guessing what's happening in your wallet. MOI Insight uses Gemini AI to decode complex transactions, detect risks, and provide actionable security insights in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={onConnect}
              disabled={isConnecting}
              className="neon-glow group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Wallet className="w-6 h-6" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
            <Link
              to="/features"
              className="group px-10 py-5 bg-white/5 border border-white/10 rounded-full font-bold text-lg flex items-center gap-3 transition-all hover:bg-white/10"
            >
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};
