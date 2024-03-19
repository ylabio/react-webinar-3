import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  
  useEffect(() => {
    store.actions.profile.getProfile();
    store.actions.categories.load();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
