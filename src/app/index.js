import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import ProfileRoot from "../containers/profile-root";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  const activeModal = useSelector((state) => state.modals.name);
  const token = useSelector((state) => state.login.token);

  useInit(
    () => {
      store.actions.profile.getProfile();
    },
    [token],
    true
  );
  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route
          path={"/login"}
          element={
            <ProfileRoot url={"/profile"} root={!token}>
              <Login />
            </ProfileRoot>
          }
        />
        <Route
          path={"/profile"}
          element={
            <ProfileRoot url={"/login"} root={token}>
              <Profile />
            </ProfileRoot>
          }
        />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
