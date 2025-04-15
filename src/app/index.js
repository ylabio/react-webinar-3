import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import ProtectedRoute from '../containers/protected-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  const isAuth = useSelector(state => state.auth.isAuth);

  useInit( async () => {
    await store.actions.auth.me();
  }, [isAuth]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path={'/profile'} element={<Profile />} />
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
