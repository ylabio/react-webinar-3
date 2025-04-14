import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

export default function OnlyPublic({ children }) {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
  }));
  if (select.isAuth) {
    return <Navigate to={from} state={{ from: location }} />;
  }

  return children;
}
