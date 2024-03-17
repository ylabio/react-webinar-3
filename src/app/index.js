import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginPage from './login-page';
import useStore from '../hooks/use-store';
import ProfilePage from './profile-page';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  
  const token = JSON.parse(localStorage.getItem('token'))?.token;
  
  useEffect(()=>{
    store.actions.login.loadToken(token);
    store.actions.login.getProfile();
  })

  const select = useSelector(state => ({
    token: state.login.token
  }));
  
  

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        {select.token ? 
        <Route path={'/profile'} element={<ProfilePage/>}/>
        :
        <Route path={'/profile'} element={<LoginPage/>}/>
        }
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
