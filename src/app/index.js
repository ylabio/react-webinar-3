import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import ProfilePage from "./profile-page";
import AuthPage from "./auth-page";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const activeModal = useSelector((state) => state.modals.name);

  useInit(() => {
    store.actions.user.initUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/profile"} element={<ProfilePage />} />
        <Route path={"/login"} element={<AuthPage />} />
        <Route path={"/articles/:id"} element={<Article />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
