// In-memory orders store
const orders = [];
let nextOrderId = 1001;

function createOrder({ customerName, email, items }) {
  const order = {
    id: `ORD-${nextOrderId++}`,
    customerName,
    email,
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

function getAllOrders() {
  return orders;
}

function getOrderById(id) {
  return orders.find((o) => o.id === id) || null;
}

module.exports = { createOrder, getAllOrders, getOrderById };
