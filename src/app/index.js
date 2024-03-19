import {Routes, Route} from 'react-router-dom';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Authorization from "./auth";
import Profile from "./profile";
import AuthGuard from "../containers/auth-guard";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    token: state.auth.token,
  }));

  /**
   * Проверка авторизации и получение данных пользователя
   */
  useInit(() => {
    if (select.token) {
      store.actions.user.loadUser(select.token);
    }
  }, [select.token], true)

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Authorization/>}/>
        <Route path={'/profile'} element={<AuthGuard redirect={'/login'}><Profile/></AuthGuard>}/>
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
