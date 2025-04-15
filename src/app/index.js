import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import PrivateRoute from '../hoc/private-route';
import AuthPanel from '../containers/auth-panel';
import OnlyPublicRoute from '../hoc/only-public-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <AuthPanel/>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<OnlyPublicRoute><Login/></OnlyPublicRoute>}/>
        <Route path={'/profile'} element={<PrivateRoute><Profile/></PrivateRoute>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
