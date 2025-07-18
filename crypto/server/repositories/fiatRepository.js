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

exports.createFiat = ({ currency_code, currency_name, rate_to_usd }) => {
  return FiatCurrency.create({ currency_code, currency_name, rate_to_usd });
};

exports.updateFiat = async (fiat, newData) => {
  return fiat.update(newData);
};
