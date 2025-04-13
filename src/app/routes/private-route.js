import { Navigate } from 'react-router-dom';

import useSelector from '../../hooks/use-selector';

const PrivateRoute = ({ Component }) => {
  const isAuthorized = useSelector(state => state.profile.isAuth);

  return isAuthorized ? <Component /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
