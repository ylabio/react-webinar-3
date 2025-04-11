import { memo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import ProtectedRoute from './protected-route'
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  
  // Инициализация авторизации при загрузке
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !store.state.login?.user) {
      store.actions.login.autoLogin();
    }
  }, [store]);

  return (
    <>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default memo(App);
