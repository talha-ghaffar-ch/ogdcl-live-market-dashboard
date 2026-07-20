import { Router } from 'express';
import { PSXDataPortalProvider } from '../providers/PSXDataPortalProvider';

const router = Router();
const provider = new PSXDataPortalProvider();

// Simple in-memory cache to avoid rate limiting
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 10000; // 10 seconds

router.get('/quote/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const cacheKey = `quote_${symbol}`;

  try {
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return res.json(cached.data);
      }
    }

    const data = await provider.getQuote(symbol.toUpperCase());
    cache.set(cacheKey, { data, timestamp: Date.now() });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/chart/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const cacheKey = `chart_${symbol}`;

  try {
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return res.json(cached.data);
      }
    }

    const data = await provider.getIntradayChart(symbol.toUpperCase());
    cache.set(cacheKey, { data, timestamp: Date.now() });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
