import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';

import './App.css';
import Home from './components/Home.jsx';
import ProductDetails from './components/product/ProductDetails.jsx';

// Auth or User Imports
import Login from './components/user/Login.jsx';
import Register from './components/user/Register.jsx';
import Profile from './components/user/Profile.jsx';
import UpdateProfile from './components/user/UpdateProfile.jsx';
import UpdatePassword from './components/user/UpdatePassword.jsx';
import ForgotPassword from './components/user/ForgotPassword.jsx';
import ResetPassword from './components/user/ResetPassword.jsx';

// Admin Imports
import Dashboard from './components/admin/Dashboard.jsx';
import ProductsList from './components/admin/ProductsList.jsx';
import NewProduct from './components/admin/NewProduct.jsx';
import UpdateProduct from './components/admin/UpdateProduct.jsx';
import OrdersList from './components/admin/OrdersList.jsx';
import ProcessOrder from './components/admin/ProcessOrder.jsx';
import UsersList from './components/admin/UsersList.jsx';
import UpdateUser from './components/admin/UpdateUser.jsx';
import ProductReviews from './components/admin/ProductReviews.jsx';

// Cart Imports
import Cart from './components/cart/Cart.jsx';
import Shipping from './components/cart/Shipping.jsx';
import ConfirmOrder from './components/cart/ConfirmOrder.jsx';
import Payment from './components/cart/Payment.jsx';
import OrderSuccess from './components/cart/OrderSuccess.jsx';

// Order Imports
import ListOrders from './components/order/ListOrders.jsx';
import OrderDetails from './components/order/OrderDetails.jsx';

import Protected from './components/route/Protected.jsx';
import { useSelector } from 'react-redux';
import { loadUser } from './actions/userActions.js';
import store from './store';
import axios from 'axios';

// Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      try {
        const { data } = await axios.get('/api/v1/stripeapi');
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/search/:keyword' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} exact />

            <Route path='/cart' element={<Cart />} />
            <Route
              path='/shipping'
              element={
                <Protected>
                  <Shipping />
                </Protected>
              }
            />
            <Route
              path='/order/confirm'
              element={
                <Protected>
                  <ConfirmOrder />
                </Protected>
              }
            />
            {stripeApiKey && (
              <Route
                path='/payment'
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Protected>
                      <Payment />
                    </Protected>
                  </Elements>
                }
              />
            )}
            <Route
              path='/success'
              element={
                <Protected>
                  <OrderSuccess />
                </Protected>
              }
            />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/password/forgot' element={<ForgotPassword />} exact />
            <Route
              path='/password/reset/:token'
              element={<ResetPassword />}
              exact
            />
            <Route
              path='/me'
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
              exact
            />
            <Route
              path='/me/update'
              element={
                <Protected>
                  <UpdateProfile />
                </Protected>
              }
              exact
            />
            <Route
              path='/password/update'
              element={
                <Protected>
                  <UpdatePassword />
                </Protected>
              }
              exact
            />

            <Route
              path='/orders/me'
              element={
                <Protected>
                  <ListOrders />
                </Protected>
              }
              exact
            />
            <Route
              path='/order/:id'
              element={
                <Protected>
                  <OrderDetails />
                </Protected>
              }
              exact
            />
          </Routes>
        </div>

        <Routes>
          <Route
            path='/dashboard'
            element={
              <Protected>
                <Dashboard isAdmin={true} />
              </Protected>
            }
            exact
          />
          <Route
            path='/admin/products'
            element={
              <Protected>
                <ProductsList isAdmin={true} />
              </Protected>
            }
            exact
          />
          <Route
            path='/admin/product'
            element={
              <Protected>
                <NewProduct isAdmin={true} />
              </Protected>
            }
            exact
          />
          <Route
            path='/admin/product/:id'
            element={
              <Protected>
                <UpdateProduct isAdmin={true} />
              </Protected>
            }
            exact
          />
          <Route
            path='/admin/orders'
            element={
              <Protected>
                <OrdersList isAdmin={true} />
              </Protected>
            }
            exact
          />
          <Route
            path='/admin/order/:id'
            element={
              <Protected>
                <ProcessOrder isAdmin={true} />
              </Protected>
            }
            exact
          />
          <Route
            path='/admin/users'
            element={
              <Protected>
                <UsersList isAdmin={true} />
              </Protected>
            }
            exact
          />
          <Route
            path='/admin/user/:id'
            element={
              <Protected>
                <UpdateUser isAdmin={true} />
              </Protected>
            }
            exact
          />
          <Route
            path='/admin/reviews'
            element={
              <Protected>
                <ProductReviews isAdmin={true} />
              </Protected>
            }
            exact
          />
        </Routes>
        {!loading && user && user.role !== 'admin' && <Footer />}
      </div>
    </Router>
  );
}

export default App;
