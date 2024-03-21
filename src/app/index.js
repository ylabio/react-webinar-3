import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import ProfilePage from "./profile-page";
import AuthPage from "./auth-page";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import ProtectContainer from "../containers/protect-container";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const selector = useSelector((state) => ({
    activeModal: state.modals.name,
    userData: state.user.userData,
  }));

  const token = useMemo(
    () => localStorage.getItem("token"),
    [selector.userData]
  );

  useInit(() => {
    token && store.actions.user.initUser(token);
  }, []);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route element={<ProtectContainer isAuth={!!token} path={"/login"} />}>
          <Route path={"/profile"} element={<ProfilePage />} />
        </Route>
        <Route path={"/login"} element={<AuthPage />} />
        <Route path={"/articles/:id"} element={<Article />} />
      </Routes>

      {selector.activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
