/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../actions/userActions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (message) {
      alert.success(message);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, navigate, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('email', email);
    console.log('email', formData.get('email'));
    dispatch(forgotPassword(formData.get('email')));
  };
  return (
    <Fragment>
      <MetaData title={'Forgot Password'} />
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-3'>Forgot Password</h1>
            <div className='form-group'>
              <label htmlFor='email_field'>Enter Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id='forgot_password_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={loading ? true : false}>
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
