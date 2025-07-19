const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  trans_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    }
  },
  receiver_id: {
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
  trans_type: {
    type: DataTypes.ENUM('transfer', 'deposit', 'withdrawal'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  trans_status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  },
}, {
  tableName: 'transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});



module.exports = Transaction;