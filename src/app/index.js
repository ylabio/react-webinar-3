import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import ProfilePad from "../components/profile-pad";
import PreHead from "../components/pre-head";
import Login from "./login";
import UserProfile from "./user-profile";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();

  useEffect(() => {
    store.actions.user.checkToken()
  }, [])

  return (
    <>
      <PreHead>
        <ProfilePad />
      </PreHead>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<UserProfile />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
