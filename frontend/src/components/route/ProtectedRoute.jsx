import React, { Fragment } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {!loading && (
        <Route
          {...rest}
          element={!isAuthenticated ? navigate('/login') : <Component />}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
