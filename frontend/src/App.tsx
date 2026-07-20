import { useMarketData } from './hooks/useMarketData';
import { DashboardHeader } from './components/DashboardHeader';
import { QuoteCard } from './components/QuoteCard';
import { MetricsGrid } from './components/MetricsGrid';
import { IntradayChart } from './components/IntradayChart';
import { Activity, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const { quote, chart, loading, error } = useMarketData('OGDC');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-800 font-sans">
        <Activity className="animate-spin text-ogdcBrand mb-4" size={48} />
        <h2 className="text-xl font-medium tracking-wide animate-pulse">Initializing Live Feed...</h2>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
        <AlertTriangle className="text-psxRed mb-4 animate-pulse" size={64} />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Connection Error</h2>
        <p className="text-slate-600 max-w-md">
          Unable to establish connection to the market data provider. 
          {error && <span className="block mt-4 font-mono text-sm text-psxRed bg-psxRed/10 p-3 rounded-lg border border-psxRed/20">{error}</span>}
        </p>
      </div>
    );
  }

  const chartColor = quote.change >= 0 ? '#00E676' : '#FF3B30';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-ogdcBrand/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DashboardHeader quote={quote} />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <QuoteCard quote={quote} />
            </motion.div>
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MetricsGrid quote={quote} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <IntradayChart data={chart} color={chartColor} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
