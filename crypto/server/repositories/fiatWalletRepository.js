const FiatWallet = require('../models/FiatWallet');

exports.findAll = () => FiatWallet.findAll();

exports.findById = (fiatWalletId) =>
  FiatWallet.findByPk(fiatWalletId);

exports.create = (data) =>
  FiatWallet.create(data);

exports.update = async (FiatWallet, data) =>
  FiatWallet.update(data);

exports.delete = (fiatWalletId) =>
  FiatWallet.destroy({ where: { fiat_wallet_id: fiatWalletId } });
