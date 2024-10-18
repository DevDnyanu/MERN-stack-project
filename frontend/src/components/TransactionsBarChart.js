import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getBarChartData } from '../api';

// Import necessary components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register components globally for use in charts
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      const { data } = await getBarChartData(month);
      setChartData(data);
    };

    fetchBarChartData();
  }, [month]);

  const data = {
    labels: chartData.map((item) => item._id),
    datasets: [
      {
        label: 'Number of items',
        data: chartData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default TransactionsBarChart;
