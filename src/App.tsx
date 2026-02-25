import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { AboutPage } from './pages/AboutPage';
import { SecurityPage } from './pages/SecurityPage';
import { ContactPage } from './pages/ContactPage';
import { connectWallet, fetchTransactions } from './lib/blockchain';
import { calculateRisk, classifyTransaction } from './lib/riskEngine';
import { analyzeTransaction } from './lib/gemini';
import { TransactionRecord, Transaction } from './types';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x1234567890123456789012345678901234567890',
    value: '1500000000000000000', // 1.5 ETH
    gasUsed: '21000',
    blockTimestamp: Math.floor(Date.now() / 1000) - 3600
  },
  {
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    from: '0x1234567890123456789012345678901234567890',
    to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    value: '0',
    gasUsed: '250000',
    blockTimestamp: Math.floor(Date.now() / 1000) - 7200
  }
];

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [wallet, setWallet] = useState<{ address: string; balance: string; provider: any } | null>(null);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const data = await connectWallet();
      setWallet(data);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const loadTransactions = useCallback(async () => {
    if (!wallet) return;
    setIsRefreshing(true);
    try {
      let rawTxs = await fetchTransactions(wallet.address, wallet.provider);
      
      if (rawTxs.length === 0) {
        rawTxs = MOCK_TRANSACTIONS;
      }

      const processedTxs: TransactionRecord[] = await Promise.all(rawTxs.map(async (tx) => {
        const risk = calculateRisk(tx);
        const context = classifyTransaction(tx);
        const aiExplanation = await analyzeTransaction(tx);

        return {
          ...tx,
          risk,
          context,
          aiExplanation
        };
      }));

      setTransactions(processedTxs);
    } catch (err: any) {
      console.error('Load Transactions Error:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, [wallet]);

  useEffect(() => {
    if (wallet) {
      loadTransactions();
    }
  }, [wallet, loadTransactions]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setWallet(null);
          setTransactions([]);
        } else {
          handleConnect();
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar 
          onConnect={handleConnect} 
          isConnecting={isConnecting} 
          walletAddress={wallet?.address || null} 
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4"
              >
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 backdrop-blur-md">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                  <button onClick={() => setError(null)} className="ml-auto text-xs opacity-50 hover:opacity-100">Dismiss</button>
                </div>
              </motion.div>
            )}

            <Routes>
              <Route path="/" element={<LandingPage onConnect={handleConnect} isConnecting={isConnecting} />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <DashboardPage 
                    wallet={wallet}
                    transactions={transactions}
                    isConnecting={isConnecting}
                    isRefreshing={isRefreshing}
                    onConnect={handleConnect}
                    onRefresh={loadTransactions}
                  />
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
