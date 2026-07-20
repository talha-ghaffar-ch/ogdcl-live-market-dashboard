export interface MarketQuote {
  symbol: string;
  price: number;
  previousClose: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  change: number;
  changePercent: number;
  lastUpdated: number;
  marketStatus: 'OPEN' | 'CLOSED' | 'UNKNOWN';
}

export interface IntradayDataPoint {
  time: number; // Unix timestamp in seconds
  value: number; // Price
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume: number; // Volume
}

export interface MarketDataProvider {
  getQuote(symbol: string): Promise<MarketQuote>;
  getIntradayChart(symbol: string): Promise<IntradayDataPoint[]>;
}
