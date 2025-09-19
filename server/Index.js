require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/users');
// const User = require('./models/User');
// const Category = require('./models/Category');
// const Expense = require('./models/Expense');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Expense Tracker API is running 🚀'));
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);
// Test DB Connection & Sync Models
sequelize.sync().then(() => {
  console.log('✅ Database synced');
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
