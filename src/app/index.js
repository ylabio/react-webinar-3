import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import RequireAuth from "../containers/require-auth";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  const store = useStore();

  useEffect(() => {
    store.actions.user.authMe();
  }, []);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/profile"}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
