import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import { PrivateRoute, PublicRoute } from './routes';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.user.initParams();
  }, [store.user]);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route element={<PrivateRoute />}>
          <Route path={'/profile'} element={<Profile />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path={'/login'} element={<Login />} />
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
