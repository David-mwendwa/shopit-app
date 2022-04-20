require('dotenv').config({ path: 'config/config.env' });
const app = require('./app');

// database
const connectDB = require('./db/connect');

// connection
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
