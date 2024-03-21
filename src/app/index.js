import { useCallback, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from './profile';
import Login from './login';
import PrivateRoute from '../containers/private-route';
import PublicRoute from '../containers/public-route';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.auth.getSession();
    store.actions.categories.setCategories();
  }, [store]);

  const params = useSelector(state => state.catalog.params)
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<PublicRoute nav={params}><Login /></PublicRoute>} />
        <Route path={'/profile'} element={<PrivateRoute nav={location.search}><Profile /></PrivateRoute>} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
