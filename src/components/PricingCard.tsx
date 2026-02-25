import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  delay?: number;
}

export const PricingCard: React.FC<PricingCardProps> = ({ 
  name, 
  price, 
  description, 
  features, 
  isPopular,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`glass-card p-10 relative flex flex-col ${isPopular ? 'border-purple-500/50 neon-glow' : ''}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-gray-500">/month</span>}
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-purple-400" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-xl font-bold transition-all ${
        isPopular 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 active:scale-95' 
          : 'bg-white/5 border border-white/10 hover:bg-white/10'
      }`}>
        {price === 'Custom' ? 'Contact Sales' : 'Get Started'}
      </button>
    </motion.div>
  );
};
