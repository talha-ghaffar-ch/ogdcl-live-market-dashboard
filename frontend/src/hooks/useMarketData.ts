import { useState, useEffect, useRef } from 'react';
import type { MarketQuote, IntradayDataPoint } from '../types';

interface MarketDataState {
  quote: MarketQuote | null;
  chart: IntradayDataPoint[];
  loading: boolean;
  error: string | null;
}

const POLLING_INTERVAL = 15000; // 15 seconds

export function useMarketData(symbol: string) {
  const [data, setData] = useState<MarketDataState>({
    quote: null,
    chart: [],
    loading: true,
    error: null,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = async () => {
    try {
      const [quoteRes, chartRes] = await Promise.all([
        fetch(`http://localhost:4000/api/quote/${symbol}`),
        fetch(`http://localhost:4000/api/chart/${symbol}`)
      ]);

      if (!quoteRes.ok || !chartRes.ok) {
        throw new Error('Failed to fetch market data');
      }

      const quote = await quoteRes.json();
      const chart = await chartRes.json();

      setData(prev => ({ ...prev, quote, chart, loading: false, error: null }));
    } catch (err: any) {
      setData(prev => ({ ...prev, loading: false, error: err.message }));
    }
  };

  useEffect(() => {
    fetchData();
    timerRef.current = setInterval(fetchData, POLLING_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [symbol]);

  return data;
}
