import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useInit from "../hooks/use-init";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import LoginCheck from "../containers/login-check";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    isLogin: state.login.isLogin,
  }));

  useInit(() => {
    if(select.isLogin === true) store.actions.login.loginByToken();
  }, [], true);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login />}/>
        <Route path={'/profile'} element={
          <LoginCheck>
            <Profile />
          </LoginCheck>
        }/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
