const axios = require('axios');
const Transaction = require('../models/Transaction');
const seedData = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    await Transaction.deleteMany(); // Clear existing data
    await Transaction.insertMany(data); // Insert new data

    console.log('Data seeded successfully');
  } catch (error) {
    console.error(error);
  }
};

module.exports = seedData;
