const currencyService = require('../services/currencyService');

// GET all fiats
exports.getAllFiatCurrency = async (req, res) => {
  try {
    const fiat = await currencyService.getAllFiats();
    res.json({ success: true, data: fiat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET all cryptos
exports.getAllCryptoCurrency = async (req, res) => {
  try {
    const crypto = await currencyService.getAllCryptos();
    res.json({ success: true, data: crypto });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET fiat by ID
exports.getFiatById = async (req, res) => {
  try {
    const { fiatId } = req.params;
    const fiat = await currencyService.getFiatById(fiatId);
    res.json({ success: true, data: fiat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET crypto by ID
exports.getCryptoById = async (req, res) => {
  try {
    const { cryptoId } = req.params;
    const crypto = await currencyService.getCryptoById(cryptoId);
    res.json({ success: true, data: crypto });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE fiat
exports.createFiat = async (req, res) => {
  try {
    const fiat = await currencyService.createFiat(req.body);
    res.status(201).json({
      success: true,
      data: {
        currency_code: fiat.currency_code,
        currency_name: fiat.currency_name,
        rate_to_USD: fiat.rate_to_usd
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// CREATE crypto
exports.createCrypto = async (req, res) => {
  try {
    const crypto = await currencyService.createCrypto(req.body);
    res.status(201).json({
      success: true,
      data: {
        symbol: crypto.symbol,
        crypto_name: crypto.crypto_name,
        current_price: crypto.current_price
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE fiat
exports.updateFiat = async (req, res) => {
  try {
    const { fiatId } = req.params;
    const { rate_to_usd } = req.body;

    const updated = await currencyService.updateFiatRate(fiatId, rate_to_usd);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Fiat currency not found' });
    }

    res.json({ success: true, data: 'Fiat currency updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE crypto
exports.updateCrypto = async (req, res) => {
  try {
    const { cryptoId } = req.params;
    const { current_price } = req.body;

    const updated = await currencyService.updateCryptoPrice(cryptoId, current_price);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Crypto currency not found' });
    }

    res.json({ success: true, data: 'Crypto currency updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
