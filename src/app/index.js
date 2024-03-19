import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import ProtectedRoute from "../containers/protected-route";
import Profile from "./profile";
import Login from "./login";
import useInit from "../hooks/use-init";
import useStore from '../hooks/use-store';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.user.initUser();
  }, [], true);

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    // user: state.user.user,
  }));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path="/profile" element={
          <ProtectedRoute 
            shouldBeAuthorized={true}
            element={<Profile />}
            redirect="/login"
          />}
        />
        <Route path="/login" element={
          <ProtectedRoute
            shouldBeAuthorized={false}
            element={<Login />}
            redirect="/"
          />}
          // <AnonymousRoute 
          //   authorized={select.user !== null}
          //   element={<Login />}
          // />}
        />
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
