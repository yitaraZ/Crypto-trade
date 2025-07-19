const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Wallet = sequelize.define('Wallet', {
  wallet_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    }
  },
  crypto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'crypto_currencies',
      key: 'crypto_id'
    }
  },
  balance: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'wallets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});



module.exports = Wallet;