import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Profile from './profile';
import Login from './login';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import ProtectedRoute from '../containers/protected-route';
import GuestRoute from '../containers/guest-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);

  useInit(
    () => {
      store.actions.user.fetchUserProfile();
      store.actions.authentication.checkAuth();
    },
    [],
    true,
  );

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path={'/profile'}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
