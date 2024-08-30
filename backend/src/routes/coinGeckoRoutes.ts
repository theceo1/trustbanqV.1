import express from 'express';
import axios from 'axios';

const router = express.Router();
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

router.get('/markets', async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, { params: req.query });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching market data' });
  }
});

router.get('/market_chart', async (req, res) => {
  try {
    const { id, ...params } = req.query;
    const response = await axios.get(`${COINGECKO_API_URL}/coins/${id}/market_chart`, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching market chart data' });
  }
});

router.get('/search/trending', async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/search/trending`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending data' });
  }
});

router.get('/global', async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/global`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching global data' });
  }
});

export default router;