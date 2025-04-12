import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

const OnlyPublicRoute = ({children}) => {

  const { auth, waiting } = useAuth();

  if (waiting) return null;

  if (auth) {
    return <Navigate to="/profile" />;
  }

  return children;

}

export default OnlyPublicRoute;
