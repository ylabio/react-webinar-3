import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import UserAuth from "../containers/user-auth"


/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  
  useEffect(() => {
    store.actions.user.auth();
  }, [])

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    loggedIn: state.user.loggedIn
  }));


  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route
          path={'/profile'}
          element={<UserAuth element={<Profile/>} redirectTo={'/'}/>}
        />
        <Route
          path={'/login'}
          element={!select.loggedIn ? <Login/> : <Navigate to="/"/>}
        />
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
