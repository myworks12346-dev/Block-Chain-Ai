import React from 'react';
import { FeatureCard } from '../components/FeatureCard';
import { Shield, Zap, Eye, Lock, Cpu, Database, Search, Activity } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'AI Risk Engine',
      description: 'Advanced algorithms that evaluate transaction value, gas limits, and contract interactions to assign a precise risk score.'
    },
    {
      icon: Search,
      title: 'Context Classification',
      description: 'Automatically identifies the intent of transactions, distinguishing between token transfers, DeFi swaps, and NFT mints.'
    },
    {
      icon: Cpu,
      title: 'Gemini AI Integration',
      description: 'Leverages Google\'s most capable AI models to provide human-readable explanations of complex blockchain data.'
    },
    {
      icon: Lock,
      title: 'Secure Wallet Access',
      description: 'Direct MetaMask integration ensures your private keys never leave your browser. We only access public data.'
    },
    {
      icon: Database,
      title: 'Historical Analysis',
      description: 'Track your wallet\'s security health over time with persistent storage of analyzed transactions and risk trends.'
    },
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Get instant feedback on new transactions as they appear on the blockchain, keeping you informed at every step.'
    }
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Product Features</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            A comprehensive suite of AI-powered tools designed to make your Web3 experience safer and more transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </div>
  );
};
