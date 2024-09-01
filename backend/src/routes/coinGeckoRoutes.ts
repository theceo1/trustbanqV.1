// backend/src/routes/coinGeckoRoutes.ts
import express from 'express';
import axios from 'axios';
import rateLimit from 'express-rate-limit';

const router = express.Router();
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

router.use(limiter);

const handleCoinGeckoRequest = async (req: express.Request, res: express.Response, endpoint: string) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}${endpoint}`, { params: req.query });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data from CoinGecko: ${endpoint}`, error);
    res.status(500).json({ message: 'Error fetching data from CoinGecko' });
  }
};

router.get('/markets', (req, res) => handleCoinGeckoRequest(req, res, '/coins/markets'));
router.get('/market_chart', (req, res) => {
  const { id, ...params } = req.query;
  handleCoinGeckoRequest(req, res, `/coins/${id}/market_chart`);
});
router.get('/search/trending', (req, res) => handleCoinGeckoRequest(req, res, '/search/trending'));
router.get('/global', (req, res) => handleCoinGeckoRequest(req, res, '/global'));

export default router;