
import { Navigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';



const PrivateRoute = ({ children, nav }) => {
  console.log(nav)
  const token = localStorage.getItem('token');
  const isAuth = useSelector(state => state.auth.isAuth);

  if (!isAuth && !token) return <Navigate to='/' />;
  return <>{children}</>;
};

export default PrivateRoute;