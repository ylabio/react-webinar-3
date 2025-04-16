import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function ProtectedRoute({ children }) {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  return user ? children : <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />;
}

export default ProtectedRoute;
