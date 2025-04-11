import { Navigate, Outlet } from 'react-router-dom';

import useSelector from '../../hooks/use-selector';

const PublicRoute = () => {
  const isAuthorized = useSelector(state => state.user.isAuth);

  return isAuthorized ? <Navigate replace to="/" /> : <Outlet />;
};

export default PublicRoute;
