const Transaction = require('../models/Transaction');

exports.getAllTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '' } = req.query;

    // Update query to ensure price is treated as a number
    const query = {
      $or: [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: parseFloat(search) || { $exists: true } }, // Check if price is a number
      ],
    };

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    const total = await Transaction.countDocuments(query);
    res.json({ transactions, total, page });
  } catch (error) {
    console.error('Error fetching transactions:', error); // Log error
    res.status(500).json({ error: error.message });
  }
};

exports.getStatistics = async (req, res) => {
  const month = parseInt(req.query.month) || new Date().getMonth() + 1;
  try {
    const start = new Date(new Date().getFullYear(), month - 1, 1); // Start of the month
    const end = new Date(new Date().getFullYear(), month, 1); // Start of next month

    const totalSales = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: start, $lt: end } } },
      { $group: { _id: null, totalSales: { $sum: "$price" }, soldItems: { $sum: 1 } } },
    ]);

    const totalNotSold = await Transaction.countDocuments({
      dateOfSale: { $gte: start, $lt: end },
      sold: false,
    });

    res.json({
      totalSales: totalSales.length > 0 ? totalSales[0] : { totalSales: 0, soldItems: 0 },
      totalNotSold
    });
  } catch (error) {
    console.error('Error fetching statistics:', error); // Log error
    res.status(500).json({ error: error.message });
  }
};

exports.getBarChart = async (req, res) => {
  const month = parseInt(req.query.month) || new Date().getMonth() + 1;
  try {
    const start = new Date(new Date().getFullYear(), month - 1, 1); // Start of the month
    const end = new Date(new Date().getFullYear(), month, 1); // Start of next month

    const priceRange = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: start, $lt: end } } },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
          default: "901+",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    res.json(priceRange);
  } catch (error) {
    console.error('Error fetching bar chart data:', error); // Log error
    res.status(500).json({ error: error.message });
  }
};

exports.getPieChart = async (req, res) => {
  const month = parseInt(req.query.month) || new Date().getMonth() + 1;
  try {
    const start = new Date(new Date().getFullYear(), month - 1, 1); // Start of the month
    const end = new Date(new Date().getFullYear(), month, 1); // Start of next month

    const categoryData = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: start, $lt: end } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json(categoryData);
  } catch (error) {
    console.error('Error fetching pie chart data:', error); // Log error
    res.status(500).json({ error: error.message });
  }
};
