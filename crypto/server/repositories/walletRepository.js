const Wallet = require('../models/Wallet');

exports.findAll = () => Wallet.findAll();

exports.findById = (walletId) =>
  Wallet.findByPk(walletId);

exports.create = (data) =>
  Wallet.create(data);

exports.update = async (wallet, data) =>
  wallet.update(data);

exports.delete = (walletId) =>
  Wallet.destroy({ where: { wallet_id: walletId } });
