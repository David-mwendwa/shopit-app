import React, { useEffect } from 'react';
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

//import ProtectedRoute from './components/route/ProtectedRoute';
import Protected from './components/route/Protected';
import { loadUser } from './actions/userActions';
import store from './store';

function App() {
  useEffect(() => {
    // this causes unintented logout on load
    store.dispatch(loadUser());
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
