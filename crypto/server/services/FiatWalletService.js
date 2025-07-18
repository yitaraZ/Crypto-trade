const FiatWalletRepo = require('../repositories/fiatWalletRepository');

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
