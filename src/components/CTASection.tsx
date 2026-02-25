import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onConnect: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onConnect }) => {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-16 text-center relative overflow-hidden"
        >
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/10 to-blue-600/10 -z-10"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Understanding Your <br /> Wallet Today
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust MOI Insight to provide clarity and security for their blockchain journey.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={onConnect}
              className="neon-glow px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
              Connect Wallet
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
