import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from './profile';
import Login from './login';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import { OnlyAuth, OnlyUnAuth } from '../containers/protected-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.auth.getToken()
  },[]);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<OnlyUnAuth component={<Login/>} />}/>
        <Route path={'/profile'} element={<OnlyAuth component={<Profile/>} />}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
