import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import User from './user';
import ProtectedRoute from '../components/protected-route'

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  
  const select = useSelector((state) => ({
    user: state.user.user,
  }));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article />}/>
        <Route path={'/login'} element={
          <ProtectedRoute to="user" isAuth={!select.user}>
            <Login />
          </ProtectedRoute>
        }/>
        <Route path={'/user'} element={
          <ProtectedRoute to="login" isAuth={select.user}>
              <User />
          </ProtectedRoute>
        }/>
          
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
