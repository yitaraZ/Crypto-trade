const CryptoCurrency = require('../models/CryptoCurrency');

exports.findAllCryptos = () => {
  return CryptoCurrency.findAll();
};

exports.findCryptoById = (cryptoId) => {
  return CryptoCurrency.findByPk(cryptoId);
};

exports.findCryptoWhere = (where) => {
  return CryptoCurrency.findAll({ where });
};

exports.createCrypto = ({ symbol, crypto_name, current_price }) => {
  return CryptoCurrency.create({ symbol, crypto_name, current_price });
};

exports.updateCrypto = async (crypto, newData) => {
  return crypto.update(newData);
};
