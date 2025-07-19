const Transaction = require('../models/Transaction');

exports.findAll = async () => {
  return await Transaction.findAll({
    order: [['created_at', 'DESC']]
  });
};

exports.findById = async (id) => {
  return await Transaction.findByPk(id);
};

exports.create = async (data) => {
  return await Transaction.create(data);
};