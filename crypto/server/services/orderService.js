const orderRepo = require('../repositories/orderRepository');

exports.getAllOrders = async () => {
  return await orderRepo.findAll();
};

exports.placeOrder = async (orderData) => {

    return await orderRepo.create(orderData);
};

exports.cancelOrder = async (orderId, userId) => {
    const order = await orderRepo.findById(orderId);
    if (!order || order.user_id !== userId) throw new Error("Order not found or unauthorized");

    return await order.update({ order_status: 'CANCELLED' });
};
