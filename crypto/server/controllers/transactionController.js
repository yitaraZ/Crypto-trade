const transactionService = require('../services/transactionService');

exports.getAllTransactions = async (req, res) => {
  try {
    const trades = await transactionService.getAllTransaction();
    res.status(200).json({ success: true, data: trades });
  } catch (error) {
    console.error('[GET /transaction]', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const trade = await transactionService.gettransById(req.params.id);
    res.status(200).json({ success: true, data: trade });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
