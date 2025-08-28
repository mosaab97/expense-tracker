require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const expenseRoutes = require('./routes/expenseRoutes');
// const User = require('./models/User');
// const Category = require('./models/Category');
// const Expense = require('./models/Expense');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Expense Tracker API is running 🚀'));
app.use('/expenses', expenseRoutes);
// Test DB Connection & Sync Models
sequelize.sync().then(() => {
  console.log('✅ Database synced');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
