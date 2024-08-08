import React, { useEffect, useState } from 'react';
import { fetchCryptoNews, NewsArticle } from '../../services/api';

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchCryptoNews();
      setNews(data.articles);
    };
    getNews();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Latest News</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index} className="mb-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {article.title}
            </a>
            <p className="text-gray-700 dark:text-gray-400">{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
