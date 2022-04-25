/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Search from './Search';

const Header = () => {
  return (
    <Fragment>
      <nav className='navbar row'>
        <div className='col-12 col-md-3'>
          <div className='navbar-brand'>
            <img src='/images/shopit_logo.png' />
          </div>
        </div>

        <div className='col-12 col-md-6 mt-2 mt-md-0'>
          <Routes>
            <Route path='/' element={<Search />} />
          </Routes>
        </div>

        <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
          <button className='btn' id='login_btn'>
            Login
          </button>

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
