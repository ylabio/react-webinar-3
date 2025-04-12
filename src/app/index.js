import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LogIn from '../app/login';
import Profile from '../app/profile';
import RouteGuard from '../containers/route-guard';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import { useEffect } from 'react';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const { isAuth, username, activeModal } = useSelector(state => ({
    isAuth: state.login.isAuth,
    username: state.profile.user?.name,
    activeModal: state.modals.name,
  }));

  const store = useStore();

  useInit(
    () => {
      store.actions.login.checkAuth();
    },
    [],
    true,
  );

  useEffect(() => {
    if (isAuth && !username) {
      store.actions.profile.getUser();
    }
  }, [isAuth]);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/profile"
          element={
            <RouteGuard>
              <Profile />
            </RouteGuard>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
