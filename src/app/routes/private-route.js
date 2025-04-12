import { Navigate, Outlet  } from 'react-router-dom';

import useSelector from "../../hooks/use-selector";

const PrivateRoute = () => {
  const isAuthorized = useSelector((state) => state.user.isAuth);

  return isAuthorized ? <Outlet /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
