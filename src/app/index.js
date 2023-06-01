import { Route, Routes } from "react-router-dom";
import ProtectedComponent from "../components/protected-component";
import useInit from "../hooks/use-init";
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import Article from "./article";
import Basket from "./basket";
import Login from "./login";
import Main from "./main";
import Profile from "./profile";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);
  const { user, isUserLoading } = useSelector((state) => ({
    user: state.login.user,
    isUserLoading: state.login.isUserLoading,
  }));

  useInit(
    () => {
      store.actions.catalog.loadCategories();
      store.actions.catalog.initParams();
      store.actions.login.getUser();
    },
    [],
    true
  );

  if (isUserLoading) return null;

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route
          path={"/login"}
          element={
            <ProtectedComponent isAuth={!user}>
              <Login />
            </ProtectedComponent>
          }
        />
        <Route
          path={"/profile"}
          element={
            <ProtectedComponent isAuth={user} unauthUrl="/login">
              <Profile />
            </ProtectedComponent>
          }
        />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
