/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions';
import Loader from './layout/Loader';
import MetaData from './layout/MetaData';
import Product from './product/Product';

const Home = () => {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resultsPerPage } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, error, alert, currentPage, keyword]);

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
                  <Product key={product._id} product={product} />
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
