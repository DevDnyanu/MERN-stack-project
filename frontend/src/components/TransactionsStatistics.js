import React, { useState, useEffect } from 'react';
import { getStatistics } from '../api';

const TransactionsStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSales: { totalSales: 0, soldItems: 0 },
    totalNotSold: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const { data } = await getStatistics(month);
        
        // If the response is missing some fields, set default values
        setStatistics({
          totalSales: data.totalSales || { totalSales: 0, soldItems: 0 },
          totalNotSold: data.totalNotSold || 0,
        });
      } catch (err) {
        setError('Failed to fetch statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [month]);

  if (loading) {
    return <div>Loading statistics...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Statistics for {month}</h2>
      <p>Total Sales Amount: {statistics.totalSales.totalSales}</p>
      <p>Total Sold Items: {statistics.totalSales.soldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSold}</p>
    </div>
  );
};

export default TransactionsStatistics;
