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

// Fetch a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update product stock
exports.updateProductStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};