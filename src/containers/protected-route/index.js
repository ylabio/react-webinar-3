import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function ProtectedRoute({ children }) {
  const isAuth = useSelector(state => !!state.authentication.token);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
