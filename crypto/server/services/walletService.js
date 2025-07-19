const walletRepo = require('../repositories/walletRepository');
const Decimal = require('decimal.js');

exports.getAllWallets = () => walletRepo.findAll();

exports.getWalletById = (id) => walletRepo.findById(id);

exports.createWallet = (data) => walletRepo.create(data);

exports.updateWallet = async (id, data) => {
  const wallet = await walletRepo.findById(id);
  if (!wallet) return null;
  return await walletRepo.update(wallet, data);
};

exports.deleteWallet = async (id) => {
  const wallet = await walletRepo.findById(id);
  if (!wallet) return false;
  await walletRepo.delete(id);
  return true;
};

exports.getOrCreateWallet = async (userId, cryptoId) => {
  let wallet = await walletRepo.findByUserAndCrypto(userId, cryptoId);
  if (!wallet) {
    wallet = await walletRepo.create({
      user_id: userId,
      crypto_id: cryptoId,
      balance: 0,
    });
  }
  return wallet;
};

exports.getBalance = async (userId, cryptoId) => {
  const wallet = await walletRepo.findByUserAndCrypto(userId, cryptoId);
  return wallet ? wallet.balance : 0;
};

exports.increaseBalance = async (userId, cryptoId, amount) => {
  const wallet = await exports.getOrCreateWallet(userId, cryptoId);
  const current = new Decimal(wallet.balance);
  const add = new Decimal(amount);
  const newBalance = current.plus(add);
  
  return await walletRepo.update(wallet, { balance: newBalance });
};

exports.decreaseBalance = async (userId, cryptoId, amount) => {
  const wallet = await exports.getOrCreateWallet(userId, cryptoId);
  const current = new Decimal(wallet.balance);
  const subtractAmount = new Decimal(amount);

  if (current.lessThan(subtractAmount)) {
    throw new Error('Insufficient balance');
  }

  const newBalance = current.minus(subtractAmount);
  return await walletRepo.update(wallet, { balance: newBalance });
};