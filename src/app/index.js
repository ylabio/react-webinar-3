import { useCallback, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthChecker from '../containers/auth-checker';
import useInit from '../hooks/use-init';
import useSelector from "../hooks/use-selector";
import useStore from '../hooks/use-store';
import Article from "./article";
import Basket from "./basket";
import Login from './login';
import Main from "./main";
import Profile from './profile';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();

  useInit(async () => {
    await store.actions.session.load(); // загружаемся с токеном, проверяем авторизован ли юзер
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={
          <AuthChecker altPage='/login'>
            <Profile />
          </AuthChecker>
        } />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;