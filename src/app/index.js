import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import WithAuth from "../components/with-auth";
import { useEffect } from "react";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const token = localStorage.getItem("token");
  const authorized = useSelector((state) => state.modals.authorized);
  const activeModal = useSelector((state) => state.modals.name);

  useEffect(() => {
    if (token && !authorized) store.actions.session.getName();
  }, [store, token]);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/profile"}
          element={
            <WithAuth>
              <Profile />
            </WithAuth>
          }
        />
        <Route path={"/articles/:id"} element={<Article />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
