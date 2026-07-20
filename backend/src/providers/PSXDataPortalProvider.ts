import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { MarketDataProvider, MarketQuote, IntradayDataPoint } from './MarketDataProvider';

export class PSXDataPortalProvider implements MarketDataProvider {
  private readonly intradayUrl = 'https://dps.psx.com.pk/timeseries/int';
  private readonly companyUrl = 'https://dps.psx.com.pk/company';

  async getQuote(symbol: string): Promise<MarketQuote> {
    try {
      const response = await fetch(`${this.companyUrl}/${symbol}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch company page for ${symbol}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      const cleanNum = (str: string) => {
        const cleaned = str.replace(/Rs\.?/gi, '').replace(/,/g, '');
        const match = cleaned.match(/-?\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : 0;
      };

      const priceStr = $('.quote__close').text();
      const changeStr = $('.change__value').text();
      const percentStr = $('.change__percent').text();

      const currentPrice = cleanNum(priceStr);
      const change = cleanNum(changeStr);
      const changePercent = cleanNum(percentStr);

      const stats: Record<string, number> = {};
      $('.stats_item').each((i, el) => {
        const label = $(el).find('.stats_label').text().trim();
        const value = $(el).find('.stats_value').text().trim();
        if (label && !(label in stats)) {
          stats[label] = cleanNum(value);
        }
      });

      // The tables might have 0.00 for Open/High/Low if market is closed or using alternative fields.
      // But we extract what we can.
      const openPrice = stats['Open'] || currentPrice;
      const highPrice = stats['High'] || currentPrice;
      const lowPrice = stats['Low'] || currentPrice;
      const volume = stats['Volume'] || 0;
      const previousClose = stats['LDCP'] || (currentPrice - change);

      // Calculate PKT time manually to avoid server timezone issues
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const pktTime = new Date(utc + (3600000 * 5)); // PKT is UTC+5
      
      const day = pktTime.getDay(); // 0=Sun, 1=Mon...
      const hour = pktTime.getHours();
      const minutes = pktTime.getMinutes();
      const timeInMinutes = hour * 60 + minutes;

      let marketStatus: 'OPEN' | 'CLOSED' | 'UNKNOWN' = 'CLOSED';
      if (day >= 1 && day <= 5) {
        if (day === 5) {
          // Friday: 9:15 AM - 12:00 PM, 2:30 PM - 4:30 PM
          if ((timeInMinutes >= 555 && timeInMinutes <= 720) || (timeInMinutes >= 870 && timeInMinutes <= 990)) {
            marketStatus = 'OPEN';
          }
        } else {
          // Mon-Thu: 9:30 AM - 3:30 PM
          if (timeInMinutes >= 570 && timeInMinutes <= 930) {
            marketStatus = 'OPEN';
          }
        }
      }

      return {
        symbol,
        price: currentPrice,
        previousClose,
        open: openPrice,
        high: highPrice,
        low: lowPrice,
        volume: volume,
        change,
        changePercent,
        lastUpdated: Date.now(),
        marketStatus
      };

    } catch (error) {
      console.error(`PSXDataPortalProvider getQuote error:`, error);
      throw error;
    }
  }

  async getIntradayChart(symbol: string): Promise<IntradayDataPoint[]> {
    try {
      const response = await fetch(`${this.intradayUrl}/${symbol}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch intraday data for ${symbol}: ${response.statusText}`);
      }

      const resJson = await response.json() as any;
      if (!resJson || resJson.status !== 1 || !resJson.data) {
        throw new Error(`Invalid response format from PSX for ${symbol}`);
      }

      const dataPoints: number[][] = resJson.data;
      dataPoints.sort((a, b) => (a[0] || 0) - (b[0] || 0));

      let lastClose = 0;

      return dataPoints.map((point, index) => {
        const timestamp = point[0] || 0;
        const close = point[1] || 0;
        const volume = point[2] || 0;
        
        // The `int` endpoint only provides [timestamp, price, volume].
        // We synthesize OHLC from sequential points.
        const open = index === 0 ? close : lastClose;
        lastClose = close;

        return {
          time: timestamp,
          value: close,
          open: open,
          high: Math.max(open, close),
          low: Math.min(open, close),
          close: close,
          volume: volume
        };
      });

    } catch (error) {
      console.error(`PSXDataPortalProvider getIntradayChart error:`, error);
      throw error;
    }
  }
}
