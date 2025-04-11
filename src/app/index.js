import { Route, Routes } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../containers/protected-route';
import useInit from '../hooks/use-init';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import Article from './article';
import Basket from './basket';
import Login from './login';
import Main from './main';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);

  // Проверка авторизации при загрузке приложения
  useInit(
    () => {
      store.actions.auth.checkAuth();
    },
    [],
    true,
  );

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
