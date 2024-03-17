import {memo} from 'react';
import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from "../../components/spinner";

function ProtectedRoute({waiting, condition, redirectTo, children}) {

  return (
    <Spinner active={waiting} wait={true}>
      {condition ? children : <Navigate to={redirectTo} />}
    </Spinner>
  );
}

ProtectedRoute.propTypes = {
  waiting: PropTypes.bool.isRequired,
  condition: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default memo(ProtectedRoute);
