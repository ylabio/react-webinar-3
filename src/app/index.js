import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import ProtectedProfile from "../containers/protected-profile";
import ProtectedLogin from "../containers/protected-login";

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
        <Route path={"/articles/:id"} element={<Article />} />
        <Route
          path={"/login"}
          element={
            <ProtectedLogin>
              <Login />
            </ProtectedLogin>
          }
        />
        <Route
          path={"/profile"}
          element={
            <ProtectedProfile>
              <Profile />
            </ProtectedProfile>
          }
        />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
