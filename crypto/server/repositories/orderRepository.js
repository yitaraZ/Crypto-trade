const Order = require('../models/Order');

exports.findAll = async () => {
  return await Order.findAll({
    order: [['created_at', 'DESC']]
  });
};

exports.findById = async (orderId) => {
  return await Order.findByPk(orderId);
};

exports.getOpenOrders = async (cryptoId) => {
  return await Order.findAll({
    where: {
      crypto_id: cryptoId,
      order_status: ['PENDING', 'PARTIALLY_FILLED']
    },
    order: [['price', 'ASC']] 
  });
};

exports.create = async (data) => {
  return await Order.create(data);
};

exports.update = async (order, updates) => {
  return await order.update(updates);
};