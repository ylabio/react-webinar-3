import { memo } from 'react';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, redirect }) {
  const select = useSelector(state => ({
    successfully: state.session.successfully,
    waiting: state.session.waiting,
  }));

  if (!select.successfully && !select.waiting) {
    return <Navigate to={redirect} replace />;
  }

  if (select.successfully) {
    return children;
  }
}

ProtectedRoute.propTypes = {
  redirect: PropTypes.string,
  children: PropTypes.node,
};

export default memo(ProtectedRoute);
