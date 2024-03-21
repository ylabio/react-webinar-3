
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';



const PrivateRoute = ({ children, nav = "/" }) => {
  const token = localStorage.getItem('token');
  const isAuth = useSelector(state => state.auth.isAuth);

  if (!isAuth && !token) return <Navigate to={nav} />;
  return <>{children}</>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  nav: PropTypes.string
};

export default PrivateRoute;