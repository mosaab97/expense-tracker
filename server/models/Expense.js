const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');

const Expense = sequelize.define('Expense', {
  description: DataTypes.STRING,
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  spent_at: { type: DataTypes.DATEONLY, allowNull: false },
}, {
  tableName: 'expenses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

// Associations
Expense.belongsTo(User, { foreignKey: 'user_id' });
Expense.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Expense;
