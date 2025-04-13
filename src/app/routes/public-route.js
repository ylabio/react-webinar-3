import { Navigate  } from 'react-router-dom';

import useSelector from '../../hooks/use-selector';

const PublicRoute = ({Component}) => {
  const isAuthorized = useSelector(state => state.user.isAuth);

  return isAuthorized ? <Navigate replace to="/" /> : <Component />;
};

export default PublicRoute;
