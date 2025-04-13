import { Routes, Route } from 'react-router-dom';

import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';

import { PrivateRoute, PublicRoute } from './routes';

import Main from './main';
import Basket from './basket';
import Article from './article';
import Profile from './profile';
import Login from './login';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.profile.initParams();
  }, [store.user]);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/profile'} element={<PrivateRoute Component={Profile}/>}  />
        <Route path={'/login'} element={<PublicRoute Component={Login}/>}  />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
