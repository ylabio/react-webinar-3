import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function GuestRoute({ children }) {
  const isAuth = useSelector(state => !!state.authentication.token);
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  if (isAuth) {
    return <Navigate to={from} replace />;
  }

  return children;
}

export default GuestRoute;
