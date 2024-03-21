import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Routes, Route,Navigate,useLocation} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginPage from './login-page';
import useStore from '../hooks/use-store';
import ProfilePage from './profile-page';
import PrivateRoute from '../containers/private-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname != '/login'){
      if (location == null){
        localStorage.setItem('page','/')
      }
      else{
        localStorage.setItem('page',location.pathname);
      }
    }
  })
  const select = useSelector(state => ({
    token: state.login.token,
    isAuth: state.login.isAuth,
    waiting: state.login.waiting
  }));
  
  
  useEffect(()=>{
    store.actions.login.recoverySession();
    store.actions.profile.getProfile();
  },[select.isAuth])

  console.log(localStorage.getItem('page'))
  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path='/profile' element={<PrivateRoute waiting={select.waiting} link={'/login'} state={!select.isAuth}><ProfilePage/></PrivateRoute>}></Route>
        <Route path='/login' element={<PrivateRoute waiting={select.waiting} link={`${localStorage.getItem('page')}`} state={select.isAuth}><LoginPage/></PrivateRoute>}></Route>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
