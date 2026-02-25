import React from 'react';
import { TransactionRecord } from '../types';
import { TransactionCard } from './TransactionCard';
import { Wallet, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  address: string;
  balance: string;
  transactions: TransactionRecord[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  address, 
  balance, 
  transactions, 
  onRefresh,
  isRefreshing 
}) => {
  const highRiskCount = transactions.filter(t => t.risk.level === 'High').length;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 flex items-center gap-4"
        >
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Wallet className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Wallet Address</div>
            <div className="font-mono text-sm truncate w-40">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 flex items-center gap-4"
        >
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Balance</div>
            <div className="text-xl font-bold">{parseFloat(balance).toFixed(4)} ETH</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 flex items-center gap-4"
        >
          <div className="p-3 bg-red-500/20 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Risk Summary</div>
            <div className="text-xl font-bold">{highRiskCount} High Risk Txs</div>
          </div>
        </motion.div>
      </div>

      {/* Transactions List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Recent Activity
            <span className="text-xs font-normal text-gray-500 bg-white/5 px-2 py-1 rounded-md">
              Last 10
            </span>
          </h2>
          <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={isRefreshing ? "w-5 h-5 animate-spin" : "w-5 h-5"} />
          </button>
        </div>

        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <TransactionCard key={tx.hash} tx={tx} />
            ))
          ) : (
            <div className="glass-card p-12 text-center text-gray-500">
              No recent transactions found for this address.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
