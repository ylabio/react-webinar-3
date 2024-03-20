import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import UserAuth from "./user-auth";
import UserProfile from "./user-profile";
import HeaderAuth from "../components/header-auth";
import useAuthCheck from "../hooks/use-auth-check";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
const auth = useAuthCheck()
  return (
    <>
     <HeaderAuth/>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path="/login" element={auth?<Navigate to={'/profile'}/>:<UserAuth />} />
        <Route path="/profile" element={!auth?<Navigate to={'/login'}/>:<UserProfile />} />
        <Route path={"/articles/:id"} element={<Article />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
