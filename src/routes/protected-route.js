import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

export function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
