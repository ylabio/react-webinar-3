import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import RedirectLogin from '../containers/redirect-login';
import RedirectProfile from '../containers/redirect-profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore();

  useInit(async() => {
    await store.actions.login.checklogin();
  }, [], true);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/login'} element={
          <RedirectProfile>
            <Login/>
          </RedirectProfile>
        }/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/profile'} element={
          <RedirectLogin>
            <Profile/>
          </RedirectLogin>
        }/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
