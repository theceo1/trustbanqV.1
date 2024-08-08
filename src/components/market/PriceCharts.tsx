import React, { useEffect, useState } from 'react';
import { fetchPriceChartData, ChartData } from '../../services/api';

const PriceCharts: React.FC<{ coin: string }> = ({ coin }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const getChartData = async () => {
      const data = await fetchPriceChartData(coin);
      setChartData(data);
    };
    getChartData();
  }, [coin]);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{coin.toUpperCase()} Price Chart</h2>
      {/* Render chart here using chartData.prices */}
    </div>
  );
};

export default PriceCharts;
