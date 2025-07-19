const User = require('../models/User');
const CryptoCurrency = require('../models/CryptoCurrency');
const FiatCurrency = require('../models/FiatCurrency');
const Wallet = require('../models/Wallet');
const FiatWallet = require('../models/FiatWallet');
const Order = require('../models/Order');
const Trade = require('../models/Trade');
const Transaction = require('../models/Transaction');
const sequelize = require('../config/database');


async function seedAllScenarios() {
  try {

    await sequelize.sync({ force: true });
    console.log('Database synced (tables dropped and recreated).');


    await User.bulkCreate([
      { username: 'alice', email: 'alice@example.com', password_hash: 'hash_alice', is_active: true },
      { username: 'bob', email: 'bob@example.com', password_hash: 'hash_bob', is_active: true },
      { username: 'carol', email: 'carol@example.com', password_hash: 'hash_carol', is_active: true },
      { username: 'dave', email: 'dave@example.com', password_hash: 'hash_dave', is_active: true },
      { username: 'eve', email: 'eve@example.com', password_hash: 'hash_eve', is_active: true },
    ]);
    console.log('Users seeded');


    await CryptoCurrency.bulkCreate([
      { symbol: 'BTC', crypto_name: 'Bitcoin', current_price: 30000.00, is_active: true },
      { symbol: 'ETH', crypto_name: 'Ethereum', current_price: 2000.00, is_active: true },
    ]);
    console.log('Crypto currencies seeded');


    await FiatCurrency.bulkCreate([
      { currency_code: 'USD', currency_name: 'US Dollar', rate_to_usd: 1.0000, is_active: true },
      { currency_code: 'THB', currency_name: 'Thai Baht', rate_to_usd: 0.0300, is_active: true },
    ]);
    console.log('Fiat currencies seeded');


    await Wallet.bulkCreate([
      { user_id: 1, crypto_id: 1, balance: '1.5' },   
      { user_id: 2, crypto_id: 1, balance: '0.5' },   
      { user_id: 3, crypto_id: 2, balance: '5.0' },   // Carol ETH 5
      { user_id: 4, crypto_id: 2, balance: '10.0' },  // Dave ETH 10
      { user_id: 5, crypto_id: 1, balance: '0.0' },   // Eve BTC 0 (no balance)
    ]);
    console.log('Crypto wallets seeded');

    await FiatWallet.bulkCreate([
      { user_id: 1, fiat_id: 1, balance: 50000.00 },   
      { user_id: 2, fiat_id: 1, balance: 10000.00 },   
      { user_id: 3, fiat_id: 2, balance: 150000.00 },  
      { user_id: 4, fiat_id: 2, balance: 300000.00 },  
      { user_id: 5, fiat_id: 1, balance: 2000.00 },    
    ]);
    console.log('Fiat wallets seeded');

   
    await Order.bulkCreate([
      { user_id: 1, crypto_id: 1, fiat_id: 1, order_type: 'sell', quantity: '0.2', price: 31000.00, total_amount: 6200.00, order_status: 'pending' },  // Alice ขาย BTC
      { user_id: 2, crypto_id: 1, fiat_id: 1, order_type: 'buy', quantity: '0.2', price: 31000.00, total_amount: 6200.00, order_status: 'pending' },   // Bob ซื้อ BTC
      { user_id: 3, crypto_id: 2, fiat_id: 2, order_type: 'sell', quantity: '2.0', price: 2100.00, total_amount: 4200.00, order_status: 'cancelled' }, // Carol ยกเลิกขาย ETH
      { user_id: 4, crypto_id: 2, fiat_id: 2, order_type: 'buy', quantity: '1.0', price: 2000.00, total_amount: 2000.00, order_status: 'completed' },    // Dave ซื้อ ETH สำเร็จ
      { user_id: 5, crypto_id: 1, fiat_id: 1, order_type: 'sell', quantity: '0.1', price: 32000.00, total_amount: 3200.00, order_status: 'pending' },   // Eve ขาย BTC (ไม่มี balance)
    ]);
    console.log('Orders seeded');


    await Trade.bulkCreate([
      {
        buyer_id: 2, seller_id: 1,
        order_id: 1,
        crypto_id: 1, fiat_id: 1,
        quantity: '0.2', price: 31000.00, total_amount: 6200.00,
        trade_status: 'pending',
      },
      {
        buyer_id: 4, seller_id: 3,
        order_id: 3,
        crypto_id: 2, fiat_id: 2,
        quantity: '1.0', price: 2000.00, total_amount: 2000.00,
        trade_status: 'completed',
      },
    ]);
    console.log('Trades seeded');


    await Transaction.bulkCreate([
      // Transfer pending
      { sender_id: 1, receiver_id: 2, crypto_id: 1, trans_type: 'transfer', amount: '0.2', trans_status: 'pending' },
      // Deposit completed
      { sender_id: null, receiver_id: 1, fiat_id: 1, trans_type: 'deposit', amount: '2500', trans_status: 'completed' },
      // Withdrawal failed
      { sender_id: 2, receiver_id: null, fiat_id: 1, trans_type: 'withdrawal', amount: '1000', trans_status: 'failed' },
      // Transfer completed
      { sender_id: 3, receiver_id: 4, crypto_id: 2, trans_type: 'transfer', amount: '1.0', trans_status: 'completed' },
      // Deposit pending
      { sender_id: null, receiver_id: 5, fiat_id: 1, trans_type: 'deposit', amount: '1500', trans_status: 'pending' },
    ]);
    console.log('Transactions seeded');

    console.log('Seed data for 5 users and scenarios inserted!');
  } catch (err) {
    console.error('Seed failed:', err);
  }
}

if (require.main === module) {
  seedAllScenarios()
    .then(() => {
      console.log('Seeding finished.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Seeding error:', err);
      process.exit(1);
    });
}

module.exports = seedAllScenarios;
