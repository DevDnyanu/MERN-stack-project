import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { getPieChartData } from '../api';

// Import necessary components from Chart.js
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register components globally for use in charts
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionsPieChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      const { data } = await getPieChartData(month);
      setChartData(data);
    };

    fetchPieChartData();
  }, [month]);

  const data = {
    labels: chartData.map((item) => item._id),
    datasets: [
      {
        label: 'Category count',
        data: chartData.map((item) => item.count),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default TransactionsPieChart;
