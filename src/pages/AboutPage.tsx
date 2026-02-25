import React from 'react';
import { Shield, Target, Users, Code } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Our Mission</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We are on a mission to make the blockchain transparent and accessible for everyone through the power of AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">The Vision</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Blockchain technology is revolutionary, but it's often opaque and intimidating. Complex transactions and hidden risks prevent many from fully participating in the Web3 ecosystem.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Context Wallet was born from the need for a "human layer" on top of the blockchain. By combining advanced AI with real-time data analysis, we provide the clarity and confidence users need to navigate this new frontier.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card p-8 text-center">
              <Target className="w-10 h-10 text-purple-400 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Transparency</h4>
              <p className="text-xs text-gray-500">Decoding the complex</p>
            </div>
            <div className="glass-card p-8 text-center mt-12">
              <Shield className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Security</h4>
              <p className="text-xs text-gray-500">Protecting your assets</p>
            </div>
            <div className="glass-card p-8 text-center -mt-12">
              <Users className="w-10 h-10 text-pink-400 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Accessibility</h4>
              <p className="text-xs text-gray-500">Web3 for everyone</p>
            </div>
            <div className="glass-card p-8 text-center">
              <Code className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Innovation</h4>
              <p className="text-xs text-gray-500">AI-native architecture</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
