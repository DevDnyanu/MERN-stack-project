const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
} = require('../controllers/transactionController');

// List transactions with search and pagination
router.get('/transactions', getAllTransactions);

// Statistics API
router.get('/statistics', getStatistics);

// Bar chart data
router.get('/barchart', getBarChart);

// Pie chart data
router.get('/piechart', getPieChart);

module.exports = router;
