import React from 'react';
import { Dashboard } from '../components/Dashboard';
import { WalletConnect } from '../components/WalletConnect';
import { TransactionRecord } from '../types';
import { motion } from 'motion/react';

interface DashboardPageProps {
  wallet: { address: string; balance: string; provider: any } | null;
  transactions: TransactionRecord[];
  isConnecting: boolean;
  isRefreshing: boolean;
  onConnect: () => void;
  onRefresh: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  wallet,
  transactions,
  isConnecting,
  isRefreshing,
  onConnect,
  onRefresh
}) => {
  if (!wallet) {
    return (
      <div className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto glass-card p-12 text-center"
        >
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Dashboard Locked</h2>
          <p className="text-gray-500 mb-10">
            Please connect your MetaMask wallet to access your transaction analysis and risk insights.
          </p>
          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="neon-glow px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg flex items-center justify-center gap-3 mx-auto transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <Dashboard 
      address={wallet.address}
      balance={wallet.balance}
      transactions={transactions}
      onRefresh={onRefresh}
      isRefreshing={isRefreshing}
    />
  );
};
