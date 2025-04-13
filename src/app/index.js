import { useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import useStore from '../hooks/use-store';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Auth from './auth';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  const store = useStore();
  const { checkAuth } = useSelector(state => state.auth);

  const callbacks = {
    onCheckAuth: useCallback(() => store.actions.auth.checkAuth(), [store]),
  }

  useEffect(() => {
    callbacks.onCheckAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Auth />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
