import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';

const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const store = useStore();
  const [isRequestSent, setRequestSent] = useState(false);

  const callbacks = {
    checkAuth: useCallback(() => store.actions.user.checkAuth(), [store]),
  };

  useEffect(() => {
    callbacks.checkAuth();
    setRequestSent(true);
  }, [callbacks.checkAuth]);

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    request: state.user.request,
  }));

  if (!isRequestSent || select.request) {
    return null;
  }

  if (!select.isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default memo(ProtectedRoute);

ProtectedRoute.propTypes = {
  element: PropTypes.node,
};
