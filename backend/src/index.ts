import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import marketRoutes from './routes/market';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', marketRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PSX Market Data API is running.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
