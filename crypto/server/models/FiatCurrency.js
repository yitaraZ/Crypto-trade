const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FiatCurrency = sequelize.define('FiatCurrency', {
  fiat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  currency_code: {
    type: DataTypes.STRING(3),
    allowNull: false,
    unique: true
  },
  currency_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  rate_to_usd: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: false,
    defaultValue: 1.0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'fiat_currencies',
  timestamps: true,
  createdAt: false,
  updatedAt: 'updated_at'
});


module.exports = FiatCurrency;