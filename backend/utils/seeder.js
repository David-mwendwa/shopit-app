//require('dotenv').config({ path: '../config/config.env' });
require('dotenv').config();
const Product = require('../models/Product');
const products = require('../data/products.json');
const connectDB = require('../db/connect');

const seedProducts = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('products added successfully');
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
seedProducts();
