import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Routes, Route,Navigate} from 'react-router-dom';
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
  
  
  useEffect(()=>{
    store.actions.profile.getProfile();
  })

  const select = useSelector(state => ({
    token: state.login.token
  }));
  

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        {!select.token
        ?
        <Route path={'/profile'} element={<Navigate to={'/login'}/>}/>
        :
        <Route path={'/profile'} element={<ProfilePage/>}/>
        }
        {select.token
        ?
        <Route path={'/login'} element={<Navigate to={'/'}/>}/>
        :
        <Route path={'/login'} element={<LoginPage/>}/>
        }
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
