const FiatWalletRepo = require('../repositories/fiatWalletRepository');
const Decimal = require('decimal.js');

exports.getAllWallets = () => FiatWalletRepo.findAll();

exports.getWalletById = (id) => FiatWalletRepo.findById(id);

exports.createWallet = (data) => FiatWalletRepo.create(data);

exports.updateWallet = async (id, data) => {
  const wallet = await FiatWalletRepo.findById(id);
  if (!wallet) return null;
  return await FiatWalletRepo.update(wallet, data);
};

exports.deleteWallet = async (id) => {
  const wallet = await FiatWalletRepo.findById(id);
  if (!wallet) return false;
  await FiatWalletRepo.delete(id);
  return true;
};

exports.getOrCreateWallet = async (userId, fiatId) => {
  let wallet = await FiatWalletRepo.findByUserAndFiat(userId, fiatId);
  if (!wallet) {
    wallet = await FiatWalletRepo.create({
      user_id: userId,
      fiat_id: fiatId,
      balance: 0,
    });
  }
  return wallet;
};

exports.getBalance = async (userId, cryptoId) => {
  const wallet = await FiatWalletRepo.findByUserAndFiat(userId, cryptoId);
  return wallet ? wallet.balance : 0;
};

exports.increaseBalance = async (userId, fiatId, amount) => {
  const wallet = await exports.getOrCreateWallet(userId, fiatId);
  const current = new Decimal(wallet.balance);
  const add = new Decimal(amount);
  const newBalance = current.plus(add);
  return await FiatWalletRepo.update(wallet, { balance: newBalance });
};

exports.decreaseBalance = async (userId, cryptoId, amount) => {
  const wallet = await exports.getOrCreateWallet(userId, cryptoId);
  if (wallet.balance < amount) {
    throw new Error('Insufficient balance');
  }
  const current = new Decimal(wallet.balance);
  const add = new Decimal(amount);
  const newBalance = current.minus(add);
  return await FiatWalletRepo.update(wallet, { balance: newBalance });
};