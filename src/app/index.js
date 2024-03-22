import useStore from "../hooks/use-store";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useSelector from "../hooks/use-selector";
import useInit from "../hooks/use-init";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import ProfilePage from "./profile-page";
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */





function App() {
  const store = useStore();

  
  const activeModal = useSelector((state) => state.modals.name);


  useInit(() => {
    store.actions.auth.handleAuth();
  }, []);
  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"button-out"} element={<Main />} />
        <Route path={"/profile-page"} element={<ProfilePage />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
