import {Navigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const ProtectedRoute = ({ children }) => {

  const select = useSelector(state => ({
    token: state.authorization.token,
  }));

  if (!select.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute