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

exports.createCrypto = (data) => {
  return CryptoCurrency.create(data);
};

exports.updateCrypto = async (crypto, newData) => {
  return crypto.update(newData);
};
