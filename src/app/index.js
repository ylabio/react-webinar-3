import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import AuthGuard from '../containers/auth-guard';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore()
  const activeModal = useSelector(state => state.modals.name);

  useInit(async () => {
    await store.actions.login.checkAuth()
  })

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={
          <AuthGuard redirect='/login'>
            <Profile />
          </AuthGuard>
        } />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
