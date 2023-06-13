import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);
  const userState = useSelector((state) => state.user);
  const token = userState.token;
  useInit(() => {
    if (token) {
      store.actions.session.initUserFromStorage();
      store.actions.profile.loadData(token);
    }
  }, [store, token]);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
