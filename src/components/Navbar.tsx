import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onConnect: () => void;
  isConnecting: boolean;
  walletAddress: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onConnect, isConnecting, walletAddress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Security', path: '/security' },
    { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center neon-glow group-hover:scale-110 transition-transform">
              <Shield className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Context Wallet</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                  location.pathname === link.path ? 'text-purple-400' : 'text-gray-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={onConnect}
              disabled={isConnecting}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : isConnecting ? 'Connecting...' : 'Connect'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0F] border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => {
                    onConnect();
                    setIsOpen(false);
                  }}
                  className="w-full px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-center font-bold"
                >
                  {walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
