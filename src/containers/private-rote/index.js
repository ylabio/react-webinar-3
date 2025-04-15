import { Navigate } from 'react-router-dom';
import useRequireAuth from '../../hooks/useRequireAuth';

/**
 * Компонент защищённого маршрута.
 * Показывает children, если пользователь авторизован.
 * Иначе редиректит на /login.
 */
function PrivateRoute({ children }) {
  const { token, user, loading } = useRequireAuth();

  if (loading) return null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
