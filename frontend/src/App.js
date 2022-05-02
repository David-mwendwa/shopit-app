import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import './App.css';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

// Auth or User Imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

// Admin Imports
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';

// Cart Imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

// Order Imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

import Protected from './components/route/Protected';
import { useSelector } from 'react-redux';
import { loadUser } from './actions/userActions';
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
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
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
        </Routes>
        {!loading && user.role !== 'admin' && <Footer />}
      </div>
    </Router>
  );
}

export default App;
