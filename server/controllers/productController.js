const Product = require('../models/Product');


const getProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: 'i' } }
      : {};

    const categoryFilter = req.query.category
      ? { category: req.query.category }
      : {};

    const filter = { ...keyword, ...categoryFilter };
    
    
    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate('category')
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    res.json({ products, page_number: page, total_pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching products.' });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (product) return res.json(product);
    return res.status(404).json({ message: 'Product not found.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching product.' });
  }
};


const createProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin.' });
    }

    const { name, description, price, category, brand, countInStock, images } = req.body;

    const product = new Product({
      name: name || 'Sample name',
      description: description || 'Sample description',
      price: price || 0,
      category,
      brand: brand || '',
      countInStock: countInStock || 0,
      images: images || "",
    });

    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating product.' });
  }
};


const updateProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin.' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    const { name, description, price, category, brand, countInStock, images } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.images = images || product.images;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating product.' });
  }
};


const deleteProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin.' });
    }

    // const product = await Product.findById(req.params.id);
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    res.json({ message: 'Product removed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting product.' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
