import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginPage from './login';
import ProfilePage from './profile'
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import LoginHeaderContainer from '../containers/login-header'
import useInitAuth from '../hooks/use-init-auth';
import RouteGuard from '../containers/route-guard';
import RoutesWithoutAuth from '../containers/routes-without-auth';
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  
  useInitAuth();

  return (
    <>
      <Routes>
        <Route element={<LoginHeaderContainer/>}>
          <Route path={''} element={<Main />} />
          <Route path={'/articles/:id'} element={<Article />} />
          <Route element={<RoutesWithoutAuth/>}>
          <Route path={'/login'} element={<LoginPage/>}/>
          </Route>
          <Route element={<RouteGuard/>}>
            <Route path= {'/profile'}element={<ProfilePage/>}/>
          </Route>
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
