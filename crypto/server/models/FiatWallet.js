const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FiatWallet = sequelize.define('FiatWallet', {
  fiat_wallet_id: {
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
  fiat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'fiat_currencies',
      key: 'fiat_id'
    }
  },
  balance: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'fiat_wallets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


module.exports = FiatWallet;