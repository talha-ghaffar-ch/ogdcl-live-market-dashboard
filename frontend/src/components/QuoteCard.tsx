import React from 'react';
import type { MarketQuote } from '../types';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  quote: MarketQuote;
}

export const QuoteCard: React.FC<Props> = ({ quote }) => {
  const isUp = quote.change > 0;
  const isDown = quote.change < 0;

  const colorClass = isUp ? 'text-psxGreen' : isDown ? 'text-psxRed' : 'text-slate-500';
  const bgSoftClass = isUp ? 'bg-psxGreen/10' : isDown ? 'bg-psxRed/10' : 'bg-slate-100';

  return (
    <div className="neon-border-wrapper rounded-2xl shadow-[0_4px_20px_rgba(0,45,98,0.1)] h-full p-[2px]">
      <div className="neon-border-content rounded-[14px] p-6 relative overflow-hidden flex flex-col justify-center">
        {/* Decorative gradient orb */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${isUp ? 'bg-psxGreen' : isDown ? 'bg-psxRed' : 'bg-ogdcBrand'}`}></div>

        <div className="flex justify-between items-center mb-2">
          <h2 className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Current Price</h2>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-psxGreen/10 rounded-full border border-psxGreen/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-psxGreen opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-psxGreen"></span>
            </span>
            <span className="text-[10px] font-bold text-psxGreen uppercase tracking-wider">Updating Live</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <motion.span 
            key={quote.price}
            initial={{ opacity: 0.5, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold tracking-tight text-ogdcBlue font-sans"
          >
            Rs. {quote.price.toFixed(2)}
          </motion.span>
          
          <div className={`inline-flex items-center self-start gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xl ${colorClass} ${bgSoftClass}`}>
            {isUp ? <ArrowUpRight size={24} /> : isDown ? <ArrowDownRight size={24} /> : <Minus size={24} />}
            <span>
              {isUp ? '+' : ''}Rs. {quote.change.toFixed(2)} ({isUp ? '+' : ''}{quote.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
