const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const walletRoutes = require('./routes/walletRoutes');
const fiatWalletRoutes = require('./routes/fiatWalletRoutes');
const fiatRoutes = require('./routes/fiatRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tradeRoutes = require('./routes/tradeRoutes');


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/currencies', currencyRoutes);
app.use('/wallets', walletRoutes);
app.use('/fiat_wallets', fiatWalletRoutes);
app.use('/orders', orderRoutes);
app.use('/trades', tradeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Sync tables
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
}

startServer();
