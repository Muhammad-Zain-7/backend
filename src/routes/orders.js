const express = require('express');
const { createOrder, getAllOrders, getOrderById } = require('../data/orders');
const { games } = require('../data/games');

const router = express.Router();

// POST /api/orders — place a new order
router.post('/', (req, res) => {
  const { customerName, email, items } = req.body;

  if (!customerName || !email || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'customerName, email, and items[] are required' });
  }

  // Validate each item exists and enrich with current price
  const enrichedItems = [];
  for (const item of items) {
    const game = games.find((g) => g.id === String(item.gameId));
    if (!game) {
      return res.status(400).json({ error: `Game with id ${item.gameId} not found` });
    }
    const finalPrice = game.discount
      ? +(game.price * (1 - game.discount / 100)).toFixed(2)
      : game.price;
    enrichedItems.push({ gameId: game.id, title: game.title, quantity: item.quantity || 1, price: finalPrice });
  }

  const order = createOrder({ customerName, email, items: enrichedItems });
  res.status(201).json(order);
});

// GET /api/orders — list all orders
router.get('/', (_req, res) => {
  res.json({ orders: getAllOrders() });
});

// GET /api/orders/:id — get single order
router.get('/:id', (req, res) => {
  const order = getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

module.exports = router;
