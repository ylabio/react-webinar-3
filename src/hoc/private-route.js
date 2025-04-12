import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

const PrivateRoute = ({children}) => {

  const { auth, waiting } = useAuth();

  if (waiting) return null;

  if (!auth) {
    return <Navigate to='/login' />
  }

  return children;
}

export default PrivateRoute;
