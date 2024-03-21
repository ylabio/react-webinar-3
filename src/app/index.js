import {Routes, Route, useLocation} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import {PrivateRoute} from './PrivateRoute';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import { useEffect } from 'react';
import { getCurrentToken } from '../utils';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore()

  useInit(() => {
    const token = getCurrentToken()
    if(token) store.actions.login.validateToken(token)
  }, [])

  useEffect(() => {
    const handleStorage = (e) => {
      if(e.key === 'token') store.actions.login.logOut('Ключ входа был измнен. Необходимо перезайти в аккаунт')
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const select = useSelector(state =>({
     activeModal: state.modals.name,
     isLoggedIn: state.login.isLoggedIn,
  }));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login />}/>
        <Route path={'/profile'} element={
          <PrivateRoute route='/login'>
            <Profile />
          </PrivateRoute>
        }
        />
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
