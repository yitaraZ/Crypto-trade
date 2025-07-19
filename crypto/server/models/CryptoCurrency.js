const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CryptoCurrency = sequelize.define('CryptoCurrency', {
  crypto_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  symbol: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  crypto_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  current_price: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'crypto_currencies',
  timestamps: true,
  createdAt: false,
  updatedAt: 'updated_at'
});


module.exports = CryptoCurrency;