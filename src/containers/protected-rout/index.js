import { Navigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ unauthorized = false, component }) => {
  const select = useSelector(state => ({
    user: state.session.username,
  }));

  if (unauthorized && select.user) {
    return <Navigate to="/profile" />;
  }
  if (!unauthorized && !select.user) {
    return <Navigate to="/login" />;
  }
  return component;
};

export const Authorized = ProtectedRoute;
export const Unauthorized = ({ component }) => (
  <ProtectedRoute unauthorized component={component} />
);

ProtectedRoute.propTypes = {
  unauthorized: PropTypes.bool,
  component: PropTypes.node,
};
