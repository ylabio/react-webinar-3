import { Navigate } from 'react-router';
import useSelector from '../../hooks/use-selector';

function PrivateRoute({ children }) {

  const select = useSelector(state => ({
    isLogin: state.authorization.isLogin
  }));

  if (select.isLogin === false) {
    return <Navigate to={'/login'} replace={true} />
  }
  return children;
}

export default PrivateRoute;
