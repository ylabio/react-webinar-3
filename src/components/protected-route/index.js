import React from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import Spinner from '../spinner';
function ProtectedRoute({ children, anonymous = false }) {
  const select = useSelector(state => ({
    isLogin: state.authorization.isLogin,
    isLoading: state.authorization.isLoading,
  }));

  const location = useLocation();

  if (select.isLoading ) {
    return <Spinner active={select.isLoading}></Spinner>;
  }

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && select.isLogin) {
    const redirectTo = location.state?.back || '/';
    return <Navigate to={redirectTo} replace />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !select.isLogin) {
    return <Navigate to="/login" state={{ back: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;
