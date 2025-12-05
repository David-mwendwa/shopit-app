import 'dotenv/config.js';
import mongoose from 'mongoose';
import app from './app.js';

// handle uncought exceptions
process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exceptions`);
  process.exit(1);
});

// Set Mongoose options
mongoose.set('strictQuery', false);

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/markethub',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5001;
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.log(`ERROR: ${err.message}`);
      console.log(
        'Shutting down the server due to unhandled promise rejection'
      );
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
