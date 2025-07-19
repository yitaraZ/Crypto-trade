const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  order_id: {
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
  fiat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'fiat_currencies',
      key: 'fiat_id'
    }
  },
  order_type: {
    type: DataTypes.ENUM('buy', 'sell'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  total_amount: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false
  },
  order_status: {
    type: DataTypes.ENUM('pending', 'partial', 'completed', 'cancelled'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


module.exports = Order;