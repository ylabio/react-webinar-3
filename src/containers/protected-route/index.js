import {memo} from "react";
import {Navigate} from 'react-router-dom';
import PropTypes from "prop-types";

function ProtectedRoute({children, isLoggedIn}) {

  return (
    isLoggedIn ? children : <Navigate to="/login" replace />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
}

export default memo(ProtectedRoute);
