import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import Article from "./article";
import Basket from "./basket";
import Login from "./login";
import Main from "./main";
import Profile from "./profile";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  const store = useStore();

  const select = useSelector((state) => ({
    token: state.session.token,
  }));

  useEffect(() => {
    store.actions.session.checkAuth();
  }, []);

  useEffect(() => {
    if (select.token) {
      store.actions.profile.load(select.token);
    }
  }, [select.token]);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
