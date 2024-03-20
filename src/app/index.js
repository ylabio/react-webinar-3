import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./prorile";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import ProtectedRoute from "../containers/protected-routed";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();

  const select = useSelector(state => ({
    token: state.authorization.token,
  }));

  useInit(() => {
    if(select.token) {
      store.actions.profile.getUserInfo(select.token);
    }
    return
  }, [store, select.token], true);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'}
               element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
