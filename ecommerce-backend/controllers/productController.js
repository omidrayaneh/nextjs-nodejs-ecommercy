// File: controllers/productController.js
const Product = require('../models/product');

// Function to get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Function to get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Function to create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = await Product.create({ name, price, description });
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(403)
      res.send({ status: 'error', message: "Product already exists"});
  } else {
      res.status(500)
      res.send({ status: 'error', message: "Something went wrong"});
  }
  }
};

// Function to update an existing product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const product = await Product.findByPk(id);
    if (product) {
      await product.update({ name, price, description });
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
// Export the functions
