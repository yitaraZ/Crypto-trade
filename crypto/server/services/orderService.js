const orderRepo = require('../repositories/orderRepository');

exports.getAllOrders = async () => {
  return await orderRepo.findAll();
};

exports.placeOrder = async (orderData) => {
    return await orderRepo.create(orderData);
};

exports.completeOrder = async (orderId, userId) => {
  const order = await orderRepo.findById(orderId);
  if (!order || order.user_id !== userId) throw new Error("Order not found or unauthorized");
  if (order.order_status === 'cancelled' || order.order_status === 'completed') {
    throw new Error("Order cannot be completed");
  }
  return await order.update({ 
    order_status: 'completed',
  });
};

exports.cancelOrder = async (orderId) => {
    const order = await orderRepo.findById(orderId);
    if (!order) throw new Error("Order not found or unauthorized");

    return await order.update({ order_status: 'cancelled' });
};
