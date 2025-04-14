import React from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
function ProtectedRoute({ children, anonymous = false }) {
  const select = useSelector(state => ({
    auth: state.authorization,
  }));

  const location = useLocation();

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && select.auth.isLogin) {
    const redirectTo = location.state?.back || '/';
    return <Navigate to={redirectTo} replace />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !select.auth.isLogin) {
    return <Navigate to="/login" state={{ back: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;
