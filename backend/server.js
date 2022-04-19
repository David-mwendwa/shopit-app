require('dotenv').config({ path: 'config/config.env' });
const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
