/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  //const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('You logged out');
  };
  return (
    <Fragment>
      <nav className='navbar row'>
        <div className='col-12 col-md-3'>
          <div className='navbar-brand'>
            <Link to='/'>
              <img src='/images/shopit_logo.png' />
            </Link>
          </div>
        </div>

        <div className='col-12 col-md-6 mt-2 mt-md-0'>
          <Routes>
            <Route path='/' element={<Search />} />
          </Routes>
        </div>

        <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
          <Link to='/login' className='btn ml-4' id='login_btn'>
            Login
          </Link>

          <span id='cart' className='ml-3'>
            Cart
          </span>
          <span className='ml-1' id='cart_count'>
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
