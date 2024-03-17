import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login/login';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  useInit(async () => {
    await store.actions.authorization.checkAuthorization();
  });

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
