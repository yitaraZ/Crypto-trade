const orderService = require('../services/orderService');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('[GET /orders]', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.placeOrder = async (req, res) => {
  try {
    const result = await orderService.placeOrder(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const result = await orderService.cancelOrder(req.params.id, req.user.id);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
