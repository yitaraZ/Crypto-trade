const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trade = sequelize.define('Trade', {
  trade_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  buyer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    }
  },
  seller_id: {
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
  trade_status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'trades',
  timestamps: false,
  createdAt: 'created_at'
});


Trade.associate = (models) => {
  Trade.belongsTo(models.User, {
    foreignKey: 'buyer_id',
    as: 'buyer'
  });
  
  Trade.belongsTo(models.User, {
    foreignKey: 'seller_id',
    as: 'seller'
  });
  
  Trade.belongsTo(models.CryptoCurrency, {
    foreignKey: 'crypto_id',
    as: 'cryptocurrency'
  });
  
  Trade.belongsTo(models.FiatCurrency, {
    foreignKey: 'fiat_id',
    as: 'fiatCurrency'
  });
};

module.exports = Trade;