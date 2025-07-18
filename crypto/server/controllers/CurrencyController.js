
const CryptoCurrency = require('../models/CryptoCurrency');
const FiatCurrency = require('../models/FiatCurrency');


exports.getAllFiatCurrency = async (req, res) => {
    try {
        const fiat = await FiatCurrency.findAll();

        res.json({
            success: true,
            data: fiat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllCryptoCurrency = async (req, res) => {
    try {
        const crypto = await CryptoCurrency.findAll();

        res.json({
            success: true,
            data: crypto
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getFiatById = async (req, res) => {
  try {
    const { fiatId } = req.params;
    
    const fiat = await FiatCurrency.findAll({
      where: { fiat_id: fiatId }
    });

    res.json({
      success: true,
      data: fiat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getCryptoById = async (req, res) => {
  try {
    const { cryptoId } = req.params;
    
    const crypto = await CryptoCurrency.findAll({
      where: { crypto_id: cryptoId }
    });

    res.json({
      success: true,
      data: crypto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createFiat = async (req, res) => {
  try {
    const { currency_code, currency_name, rate_to_usd } = req.body;

    const fiat = await FiatCurrency.create({
      currency_code,
      currency_name,
      rate_to_usd
    });

    res.status(201).json({
      success: true,
      data: {
        currency_code: fiat.currency_code,
        currency_name: fiat.currency_name,
        rate_to_USD: fiat.rate_to_usd
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.createCrypto = async (req, res) => {
  try {
    const { symbol, crypto_name, current_price } = req.body;

    const crypto = await CryptoCurrency.create({
      symbol,
      crypto_name,
      current_price
    });

    res.status(201).json({
      success: true,
      data: {
        symbol: crypto.symbol,
        crypto_name: crypto.crypto_name,
        current_price: crypto.current_price
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateFiat = async (req, res) => {
  try {
    const { fiatId } = req.params;
    const { rate_to_usd } = req.body;

    const fiat = await FiatCurrency.findByPk(fiatId);
    
    if (!fiat) {
      return res.status(404).json({
        success: false,
        message: 'fiat currency not found'
      });
    }

    await fiat.update({ rate_to_usd });

    res.json({
      success: true,
      data: "Fiat currency updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateCrypto = async (req, res) => {
  try {
    const { cryptoId } = req.params;
    const { current_price } = req.body;

    const crypto = await CryptoCurrency.findByPk(cryptoId);
    
    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: 'crypto currency not found'
      });
    }

    await crypto.update({ current_price });

    res.json({
      success: true,
      data: "crypto currency updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};