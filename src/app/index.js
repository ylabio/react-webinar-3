import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from "./profile";
import AuthPage from "./auth-page";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/login"} element={<AuthPage />} />
        <Route path={"/articles/:id"} element={<Article />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
