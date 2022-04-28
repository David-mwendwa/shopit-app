/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userActions';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (!loading && success) {
      alert.success('password updated successfully');
      navigate('/login');
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, navigate, success, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    const passwords = {
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };
    dispatch(resetPassword(token, passwords));
  };

  return (
    <Fragment>
      <MetaData title={'New Password Reset'} />
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-3'>New Password</h1>

            <div className='form-group'>
              <label htmlFor='password_field'>Password</label>
              <input
                type='password'
                id='password_field'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='confirm_password_field'>Confirm Password</label>
              <input
                type='password'
                id='confirm_password_field'
                className='form-control'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id='new_password_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={loading ? true : false}>
              Set Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
