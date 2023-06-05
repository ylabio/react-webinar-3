import { Navigate } from 'react-router-dom';

function PrivateRoute({children, authStatus}) {
  return (
    authStatus === 'Auth'
    ? children
    : <Navigate to='/login' />
  );
}

export default PrivateRoute;
