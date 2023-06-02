import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const isAuth = useSelector(state => state.auth.isAuth)
  const store = useStore()

  useEffect(()=>{
    store.actions.auth.initAuth()
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={isAuth ? <Navigate to='/profile'/>: <Login/> }/>
        <Route path={'/profile'} element={isAuth? <Profile/> : <Navigate to='/login'/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
