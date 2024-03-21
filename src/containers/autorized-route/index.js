import { memo } from "react";
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useSelector from "../../hooks/use-selector";


function AuthorizedRoute({login, children }) {

  const loggedIn =useSelector(state => state.auth.loggedIn)

  if (!loggedIn) {
    return <Navigate to={login} />;
  }
  return loggedIn ? <div>{children}</div> : children;
}

AuthorizedRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default memo(AuthorizedRoute);
