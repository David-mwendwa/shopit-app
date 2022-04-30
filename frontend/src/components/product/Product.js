/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';
import { cartImage2 } from '../cart/CartImage';

const Product = ({ product, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className='card p-2 rounded'>
        <img
          className='card-img-top mx-auto'
          src={(product.images && product.images[0]?.url) || cartImage2}
        />
        <div className='card-body d-flex flex-column'>
          <h5 className='card-title'>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className='ratings mt-auto'>
            <div className='rating-outer'>
              <div
                className='rating-inner'
                style={{
                  width: `${(product.ratings / 5) * 100}%`,
                }}></div>
            </div>
            <span id='no_of_reviews'>({product.numOfReviews} Reviews)</span>
          </div>
          <p className='card-text'>${product.price}</p>
          <Link
            to={`/product/${product._id}`}
            id='view_btn'
            className='btn btn-block'>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
