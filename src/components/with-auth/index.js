import { memo } from "react";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function WithAuth({ children }) {
  const authorized = useSelector((state) => state.session.authorized);

  return <>{authorized ? children : <Navigate to="/login" />}</>;
}

export default memo(WithAuth);
