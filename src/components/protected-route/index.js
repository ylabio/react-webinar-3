import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function ProtectedRoute({user, children}) {
  
  const select = useSelector((state) => ({
    user: state.user.user,
  }));

  if (!select.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
