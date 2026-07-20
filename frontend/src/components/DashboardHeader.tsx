import React from 'react';
import type { MarketQuote } from '../types';
import { format } from 'date-fns';
import { Clock, ExternalLink, Activity } from 'lucide-react';

interface Props {
  quote: MarketQuote;
}

export const DashboardHeader: React.FC<Props> = ({ quote }) => {
  const isOpen = quote.marketStatus === 'OPEN';

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-slate-200">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ogdcBlue font-sans">
          Oil & Gas Development Company Limited
        </h1>
        <div className="flex items-center gap-4 mt-3">
          <span className="px-3 py-1 rounded text-sm font-semibold bg-ogdcBrand/10 text-ogdcBrand border border-ogdcBrand/30 shadow-[0_0_10px_rgba(245,130,32,0.1)]">
            {quote.symbol}
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
            Pakistan Stock Exchange
            <a
              href={`https://dps.psx.com.pk/company/${quote.symbol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ogdcBlue hover:text-ogdcBrand transition-colors duration-300"
              title="View on PSX"
            >
              <ExternalLink size={16} />
            </a>
          </span>
        </div>
      </div>

      <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-3">
        {/* Market Status Glow */}
        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <span className="relative flex h-3 w-3">
            {isOpen ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-psxGreen opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 animate-glow-pulse-green"></span>
              </>
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-psxRed opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 animate-glow-pulse-red"></span>
              </>
            )}
          </span>
          <span className={`text-sm font-bold tracking-wide ${isOpen ? 'text-psxGreen' : 'text-psxRed'}`}>
            MARKET {quote.marketStatus}
          </span>
        </div>

        {/* Live Update Glow */}
        <div className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
          <Activity size={14} className="text-ogdcBrand animate-pulse" />
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-ogdcBrand animate-ping"></span>
            Live Data Feed
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
          <Clock size={12} />
          <span>Updated: {format(new Date(quote.lastUpdated), 'MMM d, yyyy h:mm:ss a')}</span>
        </div>
      </div>
    </div>
  );
};
