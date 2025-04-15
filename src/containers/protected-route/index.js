import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting,
  }));

  if (select.waiting) return null

  return select.isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default memo(ProtectedRoute);
