import React from 'react';
import { PricingCard } from '../components/PricingCard';

export const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for casual users exploring Web3.',
      features: [
        '20 transactions per month',
        'Basic risk scoring',
        'Standard AI explanations',
        'MetaMask integration',
        'Community support'
      ]
    },
    {
      name: 'Pro',
      price: '$19',
      description: 'For active traders and DeFi enthusiasts.',
      isPopular: true,
      features: [
        'Unlimited transactions',
        'Advanced risk insights',
        'Priority AI processing',
        'Historical storage',
        'Wallet health reports',
        'Priority support'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for teams and institutions.',
      features: [
        'Custom API access',
        'Dedicated risk models',
        'Multi-wallet monitoring',
        'White-label options',
        '24/7 dedicated support',
        'Custom integrations'
      ]
    }
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Simple Pricing</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your Web3 activity level. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <PricingCard key={i} {...p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
};
