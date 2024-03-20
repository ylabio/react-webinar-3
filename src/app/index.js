import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import AuthRoute from '../containers/auth-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  useInit(() => {
    store.actions.user.initParams();
  }, [], true);

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isAuth: state.user.isAuth
  }));
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<AuthRoute redirectPath={'/profile'} check={!select.isAuth}><Login /></AuthRoute>} />
        <Route path={'/profile'} element={<AuthRoute redirectPath={'/login'} check={select.isAuth}><Profile /></AuthRoute>} />
      </Routes>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
