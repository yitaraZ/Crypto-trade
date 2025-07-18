const FiatWalletService = require('../services/FiatWalletService');

exports.getAll = async (req, res) => {
  try {
    const wallets = await FiatWalletService.getAllWallets();
    res.json({ success: true, data: wallets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const wallet = await FiatWalletService.getWalletById(req.params.id);
    if (!wallet) return res.status(404).json({ success: false, message: 'Fiat Wallet not found' });
    res.json({ success: true, data: wallet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const wallet = await FiatWalletService.createWallet(req.body);
    res.status(201).json({ success: true, data: wallet });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await FiatWalletService.updateWallet(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Fiat Wallet not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const success = await FiatWalletService.deleteWallet(req.params.id);
    if (!success) return res.status(404).json({ success: false, message: 'Fiat Wallet not found' });
    res.json({ success: true, message: 'Fiat Wallet deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
