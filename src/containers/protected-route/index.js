import { useCallback } from "react";
import { Navigate, Route } from "react-router-dom";
import Spinner from "../../components/spinner";

const ProtectedRoute = ({ shouldBeAuthorized, isAuthorized, isWaiting, element, redirect }) => {
  const route = useCallback(() => {
    if (isWaiting) {
      return <h3>Loading...</h3>
    }
    return (shouldBeAuthorized == isAuthorized ? element : <Navigate to={redirect} />);

  }, [shouldBeAuthorized, isAuthorized, isWaiting, element, redirect])

  return route();
}

export default ProtectedRoute;