const tradeService = require('../services/tradeService');

exports.getAllTrades = async (req, res) => {
  try {
    const trades = await tradeService.getAllTrades();
    res.status(200).json({ success: true, data: trades });
  } catch (error) {
    console.error('[GET /trades]', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTradeById = async (req, res) => {
  try {
    const trade = await tradeService.getTradeById(req.params.id);
    res.status(200).json({ success: true, data: trade });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.createTrade = async (req, res) => {
  try {
    const newTrade = await tradeService.createTrade(req.body);
    res.status(201).json({ success: true, data: newTrade });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.completeTrade = async (req, res) => {
  try {
    const updatedTrade = await tradeService.completeTrade(req.params.id);
    res.json({ success: true, data: updatedTrade });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.cancelTrade = async (req, res) => {
  try {
    const updatedTrade = await tradeService.cancelTrade(req.params.id);
    res.json({ success: true, data: updatedTrade });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

