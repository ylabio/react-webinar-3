import React from 'react'
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const ProtectedRoute = ({isLoggedIn, element}) => {
  return isLoggedIn ? <>{element} </> : <Navigate to='/login' replace={true} />;
}

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute