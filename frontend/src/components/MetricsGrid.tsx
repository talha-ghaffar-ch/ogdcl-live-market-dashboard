import React from 'react';
import type { MarketQuote } from '../types';
import { Activity, ArrowUpCircle, ArrowDownCircle, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  quote: MarketQuote;
}

export const MetricsGrid: React.FC<Props> = ({ quote }) => {
  const metrics = [
    { label: 'Previous Close', value: `Rs. ${quote.previousClose.toFixed(2)}`, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Day Open', value: `Rs. ${quote.open.toFixed(2)}`, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Day High', value: `Rs. ${quote.high.toFixed(2)}`, icon: ArrowUpCircle, color: 'text-psxGreen', bg: 'bg-psxGreen/10' },
    { label: 'Day Low', value: `Rs. ${quote.low.toFixed(2)}`, icon: ArrowDownCircle, color: 'text-psxRed', bg: 'bg-psxRed/10' },
    { label: 'Volume', value: quote.volume.toLocaleString(), icon: BarChart2, color: 'text-ogdcBrand', bg: 'bg-ogdcBrand/10' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 h-full">
      {metrics.map((m, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-[0_4px_20px_rgba(0,45,98,0.05)] flex flex-col justify-center items-center gap-3 text-center"
        >
          <div className={`p-3 rounded-full ${m.bg} ${m.color}`}>
            <m.icon size={24} />
          </div>
          <div>
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{m.label}</div>
            <motion.div 
              key={m.value}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="text-ogdcBlue font-bold text-xl font-sans tracking-wide"
            >
              {m.value}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
