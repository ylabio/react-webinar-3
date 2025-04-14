import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

export default function PrivatRoute({ children }) {
  const location = useLocation();
  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
  }));
  if (!select.isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
