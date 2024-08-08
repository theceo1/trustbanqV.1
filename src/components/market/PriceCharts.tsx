// src/components/market/PriceCharts.tsx
import React, { useEffect, useState } from 'react';
import { fetchBitcoinPriceData, ChartData } from '../../services/api';

interface PriceChartsProps {
  coin: string;
}

const PriceCharts: React.FC<PriceChartsProps> = ({ coin }) => {
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchBitcoinPriceData();
        setData(result);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchData();
  }, [coin]);

  return (
    <div>
      <h2>Price Chart for {coin}</h2>
      {/* Render the chart using `data` */}
    </div>
  );
};

export default PriceCharts;
