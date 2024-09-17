const Order = require('../models/order');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, status, total } = req.body;
    const newOrder = await Order.create({ userId, status, total });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      const { status, total } = req.body;
      await order.update({ status, total });
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };
