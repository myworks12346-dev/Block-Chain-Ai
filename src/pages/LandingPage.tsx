import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureCard } from '../components/FeatureCard';
import { CTASection } from '../components/CTASection';
import { Shield, Zap, Info, Eye, Lock, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onConnect, isConnecting }) => {
  const features = [
    {
      icon: Shield,
      title: 'AI Risk Detection',
      description: 'Our proprietary risk engine analyzes transaction patterns to detect potential threats before you sign.'
    },
    {
      icon: Cpu,
      title: 'Smart Explanations',
      description: 'Powered by Gemini AI, we translate complex hex data into clear, human-readable summaries.'
    },
    {
      icon: Eye,
      title: 'Wallet Safety Insights',
      description: 'Get deep visibility into your wallet activity with context-aware classification and historical analysis.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Connect Wallet',
      description: 'Securely link your MetaMask wallet without ever sharing private keys.'
    },
    {
      number: '02',
      title: 'Analyze Activity',
      description: 'Our AI engine scans your recent transactions and classifies their intent.'
    },
    {
      number: '03',
      title: 'Get Risk Insights',
      description: 'Receive detailed risk scores and AI-generated safety recommendations.'
    }
  ];

  return (
    <div>
      <Hero onConnect={onConnect} isConnecting={isConnecting} />

      {/* Developer Credit Section */}
      <section className="py-12 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
                MN
              </div>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest font-medium">Developed by</p>
                <h3 className="text-xl font-bold text-white">M. Naresh</h3>
              </div>
            </div>
            <div className="h-px w-12 bg-white/10 hidden md:block"></div>
            <a 
              href="https://www.linkedin.com/in/naresh-kumar7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#0077B5]/10 border border-[#0077B5]/20 rounded-full text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all font-bold text-sm"
            >
              Connect on LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Powerful Intelligence for Web3</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Context Wallet provides the tools you need to navigate the blockchain with confidence and security.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-12 leading-tight">
                How Context Wallet <br /> 
                <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Protects You.</span>
              </h2>
              <div className="space-y-12">
                {steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="text-4xl font-bold text-white/10">{step.number}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-gray-500">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="glass-card p-4 aspect-square flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 group-hover:scale-110 transition-transform duration-700"></div>
                <Shield className="w-48 h-48 text-purple-400/20 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/30 blur-[60px] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection onConnect={onConnect} />
    </div>
  );
};
