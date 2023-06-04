import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function AuthRoot() {
  const location = useLocation();
  const isAuth = useSelector((state) => state.user.isAuth);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location.pathname }} />
  );
}

AuthRoot.propTypes = {};
export default AuthRoot;
