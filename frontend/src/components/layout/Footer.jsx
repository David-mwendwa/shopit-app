import React, { Fragment } from 'react';

const Footer = () => {
  return (
    <Fragment>
      <footer className='py-1'>
        <p className='text-center mt-1'>
          &copy;{new Date().getFullYear()} MarketHub. All Rights Reserved
        </p>
      </footer>
    </Fragment>
  );
};

export default Footer;
