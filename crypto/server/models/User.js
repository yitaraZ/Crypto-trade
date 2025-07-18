const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password_hash) {
        user.password_hash = await bcrypt.hash(user.password_hash, 10);
      }
    }
  }
});

User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};


User.associate = (models) => {
  User.hasMany(models.Wallet, {
    foreignKey: 'user_id',
    as: 'wallets'
  });
  
  User.hasMany(models.FiatWallet, {
    foreignKey: 'user_id',
    as: 'fiatWallets'
  });
  
  User.hasMany(models.Order, {
    foreignKey: 'user_id',
    as: 'orders'
  });
  
  User.hasMany(models.Trade, {
    foreignKey: 'buyer_id',
    as: 'buyTrades'
  });
  
  User.hasMany(models.Trade, {
    foreignKey: 'seller_id',
    as: 'sellTrades'
  });
  
  User.hasMany(models.Transaction, {
    foreignKey: 'sender_id',
    as: 'sentTransactions'
  });
  
  User.hasMany(models.Transaction, {
    foreignKey: 'receiver_id',
    as: 'receivedTransactions'
  });
};

module.exports = User;
