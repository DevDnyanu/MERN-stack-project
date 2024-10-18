const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');
const seedData = require('./seed/seedData');
require('dotenv').config();

const app = express();

// Connect to DB
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', transactionRoutes);

// Seed database with API data
app.get('/api/seed', async (req, res) => {
  await seedData();
  res.send('Database seeded successfully');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
