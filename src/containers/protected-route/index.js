import { useLocation, Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const Protected = ({ onlyUnAuth = false, component }) => {

  const {isAuthChecked, user} = useSelector(state => ({
    isAuthChecked: state.auth.isAuthChecked,
    user: state.auth.user,
  }));

  const location = useLocation();

  if (!isAuthChecked) {
    return <p>Loading...</p>;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={location.state?.goBack ||  "/" } />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;

export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);