import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useStore from "../hooks/use-store";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import ProtectedRoute from "../components/protected-route";
import Profile from "./profile";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();

  const activeModal = useSelector((state) => state.modals.name);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  useEffect(() => {
    store.actions.user.getUserInfo();
  }, [isAuthorized])

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route
          path={"/login"}
          element={
            <ProtectedRoute condition={!isAuthorized} redirectPath="/profile">
              <Login />
            </ProtectedRoute>
        }/>
        <Route
          path={"/profile"}
          element={
            <ProtectedRoute condition={isAuthorized} redirectPath="/login">
              <Profile />
            </ProtectedRoute>
        }/>
        <Route path={"/articles/:id"} element={<Article />} />
        
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
