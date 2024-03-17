import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import useInit from "../hooks/use-init";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import LoginCheck from "../components/check-auth/login-check";
import AuthCheck from "../components/check-auth/auth-check";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  const store = useStore();

  useInit(() => {
    store.actions.auth.checkAuth();
  }, []);

  // console.log(store.actions);

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route
          path={"/login"}
          element={
            <LoginCheck>
              <Login />
            </LoginCheck>
          }
        />
        <Route
          path={"/profile"}
          element={
            <AuthCheck>
              <Profile />
            </AuthCheck>
          }
        />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
