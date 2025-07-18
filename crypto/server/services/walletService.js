const walletRepo = require('../repositories/walletRepository');

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
