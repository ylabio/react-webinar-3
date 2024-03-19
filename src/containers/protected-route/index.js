import { useCallback, useEffect, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import { Navigate, Route } from "react-router-dom";
import Spinner from "../../components/spinner";

const ProtectedRoute = ({ shouldBeAuthorized, element, redirect }) => {
  const store = useStore();

  // useInit(() => {
  //   store.actions.user.initUser();
  // }, [], true);

  const select = useSelector(state => ({
    user: state.user.user,
    waiting: state.user.waiting,
  }));

  useMemo(() => {
    if (!select.user) {
      store.actions.user.initUser();
    }
  }, []);

  const route = useCallback(() => {
    if (select.waiting) {
      return <h3>Loading...</h3>
    }
    return (shouldBeAuthorized == (select.user !== null) ? element : <Navigate to={redirect} />);

  }, [select.user, select.waiting])

  return route();
}

export default ProtectedRoute;