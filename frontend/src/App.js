import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import './App.css';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';

import Protected from './components/route/Protected';
import { loadUser } from './actions/userActions';
import store from './store';
import axios from 'axios';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
