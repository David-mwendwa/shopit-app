import React, { Fragment, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, clearErrors } from '../../actions/productActions';

const ProductsList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  const setProducts = () => {
    const data = {
      columns: [
        { label: 'ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Price', field: 'price', sort: 'asc' },
        { label: 'Stock', field: 'stock', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className='btn btn-primary py-1 px-2'>
              <i className='fa fa-pencil'></i>
            </Link>
            <button className='btn btn-danger py-1 px-2 ml-2'>
              <i className='fa fa-trash'></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'Product List'} />
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <Fragment>
            <h1 className='my-5'>All Products</h1>

            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <MDBDataTable
                  data={setProducts()}
                  className='px-3'
                  bordered
                  striped
                  hover
                />
              </Fragment>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;
