import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useAuth from '../hooks/use-auth';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  useAuth([]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />}/>
        <Route path={'/articles/:id'} element={<Article />}/>
        <Route path={'/profile'} element={<Profile />}/>
        <Route path={'/login'} element={<Login />}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
