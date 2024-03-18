import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import ProtectedRoute from "../containers/protected-route";
import Profile from "./profile";
import Login from "./login";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route 
          path={'/profile'} 
          element={<ProtectedRoute authRequired={true} element={<Profile />} />}
        />
        <Route 
          path={'/login'} 
          element={<ProtectedRoute authRequired={false} element={<Login />} />}
        />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
