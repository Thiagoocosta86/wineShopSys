const Product = require('../models/Product');

// Fetch all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Add a product
exports.addProduct = async (req, res) => {
  const { name, description, price, stock, category, image } = req.body;
  const product = new Product({ name, description, price, stock, category, image });
  await product.save();
  res.status(201).json(product);
};

// Update product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedProduct);
};

// Delete product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};
