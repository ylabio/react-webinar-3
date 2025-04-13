import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Header from '../components/header';
import Login from './login'
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import LoginControls from '../components/login-controls'
import Profile from './profile';


/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  const store = useStore();

  useInit(
    () => {
      store.actions.user.initUser();
    },
    [],
    true
  )

  return (
    <>
    <Header>
      <LoginControls />
    </Header>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />}></Route>
        <Route path={'/profile'} element={<Profile />}></Route>

      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
