import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function ProtectedRoute({children, to, isAuth}) {

  if (!isAuth) {
    return <Navigate to={`/${to}`} replace />;
  }

  return children;
}

export default ProtectedRoute;
