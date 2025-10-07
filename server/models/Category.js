const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Categor', {
  name: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Category;
