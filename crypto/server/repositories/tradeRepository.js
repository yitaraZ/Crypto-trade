const Trade = require('../models/Trade');


exports.findAll = async () => {
  return await Trade.findAll({
    order: [['created_at', 'DESC']]
  });
};

exports.findById = async (id) => {
  return await Trade.findByPk(id);
};

exports.create = async (tradeData) => {
  return await Trade.create(tradeData);
};

exports.updateStatus = async (id, status) => {
  const trade = await Trade.findByPk(id);
  if (!trade) return null;

  trade.trade_status = status;
  return await trade.save();
};