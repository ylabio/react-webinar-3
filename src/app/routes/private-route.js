import { Navigate } from 'react-router-dom';

import useSelector from '../../hooks/use-selector';

const PrivateRoute = ({ Component }) => {
  const select = useSelector(state => ({
    isUserAuth: state.profile.isAuth,
    isLogOut: state.profile.isClickLogOutBtn,
  }));

  if(!select.isLogOut) {
    return <Component />;
  }

  return select.isUserAuth ? <Component /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
