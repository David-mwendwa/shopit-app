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
  const [price, setPrice] = useState([1, 1000]);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resultsPerPage } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, error, alert, currentPage, keyword, price]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
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
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))}
            </div>
          </section>

          {resultsPerPage <= productsCount && (
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productsCount}
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
//         <div className="col-5 col-md-9">
//           <div className="row">
//             products &&
//             products.map((product) => <Product key={product._id} product={product} col={4} />)
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   ) : (
//     products &&
//     products.map((product) => <Product key={product._id} product={product} col={3} />)
//   );
// }
