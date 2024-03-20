import { useCallback } from "react";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const ProtectedRoute = ({ shouldBeAuthorized, redirect, children }) => {
  
  const select = useSelector(state => ({
    activeModal: state.modals.name,
    user: state.user.user,
    waiting: state.user.waiting,
  }));
  
  const route = useCallback(() => {
    if (select.waiting) {
      return <h3>Loading...</h3>
    }
    return (shouldBeAuthorized == (select.user !== null) ? children : <Navigate to={redirect} />);

  }, [shouldBeAuthorized, children, redirect, select.user, select.waiting])

  return route();
}

export default ProtectedRoute;