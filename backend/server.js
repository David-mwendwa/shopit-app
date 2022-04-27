require('dotenv').config({ path: 'config/config.env' });
//require('dotenv').config()
const app = require('./app');

// handle uncought exceptions
process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exceptions`);
  process.exit(1);
});

// database
const connectDB = require('./db/connect');

// connection
connectDB(process.env.MONGO_URI);
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`server listening on port ${port}`)
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => process.exit(1));
});

// // connection
// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () => console.log(`server listening on port ${port}`));
//   } catch (error) {
//     console.log(error);
//   }
// };
// start();
