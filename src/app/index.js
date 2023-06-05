import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.auth.setAuth();
  }, []);

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
  }));

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={select.isAuth ? <Navigate to={'/profile'}/> : <Login />} />
        <Route path={'/profile'} element={select.isAuth ? <Profile /> : <Navigate to={'/login'}/>} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
