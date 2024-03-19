import {useEffect} from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function ProtectedRoute({children}) {
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    isAuthorized: state.authorization.isAuthorized,
  }));

  useEffect(() => {
    if (!select.isAuthorized) {
      navigate('/login', {state: {goBackLink: location.pathname}});
    }
  }, [select.isAuthorized, navigate, location.pathname])

  if (select.isAuthorized) {
    return children;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node
}

export default ProtectedRoute