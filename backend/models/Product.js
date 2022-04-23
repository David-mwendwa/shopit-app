const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxlength: [100, 'product name cannot execeed 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxlength: [5, 'product price cannot execeed 5 characters'],
    default: 0,
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphone',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Sports',
        'Outdoor',
        'Home',
      ],
      message: 'Please select correct category for the product',
    },
  },
  seller: {
    type: String,
    required: [true, 'Please select product seller'],
  },
  stock: {
    type: Number,
    required: [true, 'Please select product stock'],
    maxlength: [5, 'Product name cannot execeed 5 characters'],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
