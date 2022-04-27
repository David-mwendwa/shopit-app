/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import 'rc-slider/assets/index.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions';
import Loader from './layout/Loader';
import MetaData from './layout/MetaData';
import Product from './product/Product';
// import Slider from 'rc-slider';

// TODO: rc-slider seems depricated!!! Fix.
// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);

  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphone',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Sports',
    'Outdoor',
    'Home',
  ];

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, alert, currentPage, keyword, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Buy Best Products Online`} />
          <h1 id='products_heading'>Latest Products</h1>

          <section id='products' className='container mt-5'>
            <div className='row'>
              {keyword ? (
                <Fragment>
                  <div className='col-6 col-md-3 mt-5 mb-5'>
                    <div className='px-5'>
                      <h4>Filter</h4>
                      {/* Filter by price Range goes here */}

                      <hr className='my-5' />

                      <div className='mt-5'>
                        <h4 className='mb-3'>Categories</h4>
                        <ul className='pl-0'>
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none',
                              }}
                              key={category}
                              onClick={() => setCategory(category)}>
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className='my-5' />

                      <div className='mt-5'>
                        <h4 className='mb-3'>Ratings</h4>
                        <ul className='pl-0'>
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none',
                              }}
                              key={star}
                              onClick={() => setRating(star)}>
                              <div className='rating-outer'>
                                <div
                                  className='rating-inner'
                                  style={{
                                    width: `${star * 20}%`,
                                  }}></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className='col-5 col-md-9'>
                    <div className='row'>
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>

          {resultsPerPage <= count && (
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={count}
                onChange={setCurrentPageNo}
                prevPageText={'Prev'}
                nextPageText={'Next'}
                firstPageText={'First'}
                lastPageText={'Last'}
                linkClass='page-link'
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

// {
//   keyword ? (
//     <Fragment>
//       <div className='col-6 col-md-3 mt-5 mb-5'>
//         <div className='px-5'>
//           <Range
//             marks={{ 1: `$1`, 1000: `$1000` }}
//             min={1}
//             max={1000}
//             defaultValue={[1, 1000]}
//             tipFormatter={(value) => `$${value}`}
//             tipProps={{ placement: 'top', visible: true }}
//             value={price}
//             onChange={(price) => setPrice(price)}
//           />
//         </div>
// <div className="col-5 col-md-9">
//   <div className="row">
//     products &&
//     products.map((product) => <Product key={product._id} product={product} col={4} />)
//   </div>
// </div>
//       </div>
//     </Fragment>
//   ) : (
//     products &&
//     products.map((product) => <Product key={product._id} product={product} col={3} />)
//   );
// }
