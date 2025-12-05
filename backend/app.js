// backend/app.js
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

// Setting up cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// Import routes
import productRoutes from './routes/product.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';
import paymentRoutes from './routes/payment.js';

// Use routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);

// Error handling middleware
import errorMiddleware from './middlewares/errors.js';
app.use(errorMiddleware);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

export default app;
