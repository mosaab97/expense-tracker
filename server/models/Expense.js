const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');

const Expense = sequelize.define('Expense', {
  description: DataTypes.STRING,
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  spentAt: { type: DataTypes.DATEONLY, allowNull: false, field: "spent_at" },
  categoryId: {
      type: DataTypes.INTEGER,
      field: "category_id",
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
}, {
  tableName: 'expenses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

// Associations
Expense.belongsTo(User, { foreignKey: "user_id", as: "user" });
Expense.belongsTo(Category, { foreignKey: "category_id", as: "category" });

Expense.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.category_id;
  delete values.spent_at;
  delete values.user_id;
  return values;
};

module.exports = Expense;
