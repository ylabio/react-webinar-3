import { Navigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

const PublicRoute = ({ children }) => {
  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
  }));
  return !select.isAuth ? <>{children}</> : <Navigate to="/" />;
};

export default PublicRoute;