const FiatCurrency = require('../models/FiatCurrency');

exports.findAllFiats = () => {
  return FiatCurrency.findAll();
};

exports.findFiatById = (fiatId) => {
  return FiatCurrency.findByPk(fiatId);
};

exports.findFiatWhere = (where) => {
  return FiatCurrency.findAll({ where });
};

exports.createFiat = (data) => {
  return FiatCurrency.create(data);
};

exports.updateFiat = async (fiat, newData) => {
  return fiat.update(newData);
};
