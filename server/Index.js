require('dotenv').config();
const express = require('express');
const cors = require('cors')
const sequelize = require('./config/database');
const expenseRoutes = require('./routes/expenses');
const userRoutes = require('./routes/users');
const HttpError = require('./models/httpError');
// const User = require('./models/User');
// const Category = require('./models/Category');
// const Expense = require('./models/Expense');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // your React dev server
  credentials: true,               // allow cookies / auth headers
}))
app.use(express.json());

app.get('/', (req, res) => res.send('Expense Tracker API is running 🚀'));
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err)
    })
  }
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message || 'An unknown error occurred!' });
});

// Test DB Connection & Sync Models
sequelize.sync().then(() => {
  console.log('✅ Database synced');
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
