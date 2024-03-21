import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';

const PublicRoute = ({ children, nav = "/" }) => {

  const previewPage = new URLSearchParams(nav).toString();
  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
  }));
  return !select.isAuth ? <>{children}</> : <Navigate to={`/?${previewPage}`} />;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  nav: PropTypes.string
};

export default PublicRoute;