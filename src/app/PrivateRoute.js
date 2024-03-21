import { Navigate } from "react-router-dom";
import useSelector from "../hooks/use-selector";

export const PrivateRoute = ({ children, route }) => {
  const select = useSelector(state => ({
    isLoggedIn: state.login.isLoggedIn
  }))

  if (!select.isLoggedIn) {
    return <Navigate to={route} />;
  }
  return children;
};