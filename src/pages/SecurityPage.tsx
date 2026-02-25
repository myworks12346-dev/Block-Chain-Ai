import React from 'react';
import { Shield, Lock, Eye, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const SecurityPage: React.FC = () => {
  const securityPoints = [
    {
      icon: Lock,
      title: 'No Private Key Access',
      description: 'We never ask for or store your private keys or seed phrases. All interactions happen through your browser extension.'
    },
    {
      icon: Eye,
      title: 'Public Data Only',
      description: 'Our engine only analyzes publicly available blockchain data associated with your wallet address.'
    },
    {
      icon: CheckCircle,
      title: 'MetaMask Direct Connect',
      description: 'We use the industry-standard window.ethereum provider to ensure a secure and direct connection to your wallet.'
    },
    {
      icon: Shield,
      title: 'AI Sanitization',
      description: 'All AI-generated content is sanitized to prevent XSS and ensure that recommendations are safe to follow.'
    },
    {
      icon: AlertCircle,
      title: 'No Custody of Funds',
      description: 'MOI Insight is a non-custodial tool. We cannot move your funds or execute transactions on your behalf.'
    }
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Security First</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Your safety is our top priority. We\'ve built MOI Insight with a security-first architecture that protects your assets and privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {securityPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 flex gap-8"
            >
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <point.icon className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
                <p className="text-gray-500 leading-relaxed">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-16 text-center bg-gradient-to-br from-purple-600/5 to-blue-600/5">
          <h2 className="text-3xl font-bold mb-6">Trust & Transparency</h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe that transparency is the foundation of security in Web3. Our mission is to provide you with the clearest possible view of your blockchain interactions, empowering you to make safer decisions.
          </p>
        </div>
      </div>
    </div>
  );
};
