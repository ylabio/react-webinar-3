import { memo } from "react";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function PrivateRoute({ children, address }) {

  const select = useSelector(state => ({
    status: state.login.status,
    waiting: state.login.waiting,
  }));

  if (select.status === 'noAuth') {
    return <Navigate to={address}/>
  }

  if (!select.waiting && select.status !== 'unknown') {
    return children;
  }
} 

export default memo(PrivateRoute);
