const walletService = require('../services/walletService');

exports.getAll = async (req, res) => {
  try {
    const wallets = await walletService.getAllWallets();
    res.json({ success: true, data: wallets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const wallet = await walletService.getWalletById(req.params.id);
    if (!wallet) return res.status(404).json({ success: false, message: 'Wallet not found' });
    res.json({ success: true, data: wallet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const wallet = await walletService.createWallet(req.body);
    res.status(201).json({ success: true, data: wallet });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await walletService.updateWallet(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Wallet not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const success = await walletService.deleteWallet(req.params.id);
    if (!success) return res.status(404).json({ success: false, message: 'Wallet not found' });
    res.json({ success: true, message: 'Wallet deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getBalance = async (req, res) => {
  try {
    const { userId, cryptoId } = req.params;
    const balance = await walletService.getBalance(userId, cryptoId);
    res.json({ balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.increaseBalance = async (req, res) => {
  try {
    const { userId, cryptoId } = req.body;
    const { amount } = req.body;
    const updated = await walletService.increaseBalance(userId, cryptoId, amount);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.decreaseBalance = async (req, res) => {
  try {
    const { userId, cryptoId } = req.body;
    const { amount } = req.body;
    const updated = await walletService.decreaseBalance(userId, cryptoId, amount);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
