import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (!loading && !isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  return children;
};
export default Protected;
