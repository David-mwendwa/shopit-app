const express = require('express');
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/me').get(isAuthenticatedUser, myOrders);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

module.exports = router;
