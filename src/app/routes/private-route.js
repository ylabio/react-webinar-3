import { Navigate, Outlet } from 'react-router-dom';

import useSelector from '../../hooks/use-selector';

import { LOCAL_USER_KEY } from '../../constants';

const PrivateRoute = () => {
  const select = useSelector(state => ({
    isAuthorized: state.user.isAuth,
    isUserLeaved: state.user.isUserLeave,
  }));

  const userLocaleData = JSON.parse(localStorage.getItem(LOCAL_USER_KEY));

  if (userLocaleData && userLocaleData.token.length > 0) {
    return <Outlet />;
  }

  if (select.isUserLeaved) {
    return <Navigate replace to="/" />;
  }

  return select.isAuthorized ? <Outlet /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
