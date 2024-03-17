import {Routes, Route} from 'react-router-dom';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Authorization from "./auth";
import Profile from "./profile";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isLogged: state.auth.isLogged,
    token: state.auth.token,
  }));

  /**
   * Проверка авторизации пользователя
   */
  useInit(() => {
    if (select.token) store.actions.auth.loadUser(select.token);
  }, [select.token], true)

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/authorization'} element={<Authorization/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
