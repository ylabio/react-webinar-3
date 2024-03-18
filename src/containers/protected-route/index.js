import { memo, useCallback, useEffect, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../cookie";
import GoBack from "../../components/go-back";

const ProtectedRoute = ({ authRequired, element }) => {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.user,
    waiting: state.user.waiting,
  }));

  const init = useCallback(() => {
    const accessToken = getCookie("token");
    if (accessToken && !select.user) {
      callbacks.getUserRequest(accessToken);
    }
  }, [select.user]);

  useEffect(() => {
    init();
  }, [init]);

  const callbacks = {
    getUserRequest: useCallback((accessToken) => store.actions.user.getUserRequest(accessToken), [store]),
    renderPage: useCallback(() => {
      if (select.waiting) {
        return <h1>Загрузка...</h1>;
      } else {
        if (authRequired) {
          console.log('auth required; redirecting to login page; user:')
          console.log(select.user);
          return select.user ? element : <Navigate to="/login" />;
        } else {
          console.log('auth not required; redirecting back; user:')
          console.log(select.user);
          return select.user ? <GoBack /> : element;
        }
      }
    }, [select.user])
  };
  return useMemo(() => callbacks.renderPage(), [callbacks.renderPage]);
}

export default memo(ProtectedRoute);