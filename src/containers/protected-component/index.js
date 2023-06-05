import {memo} from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';

function ProtectedComponent({children, isAuth, redirectUrl}) {
  return isAuth ? <Navigate to={redirectUrl} /> : children;
}

ProtectedComponent.propTypes = {
  children: PropTypes.node,
  isAuth: PropTypes.bool,
  redirectUrl: PropTypes.string
}

export default memo(ProtectedComponent);