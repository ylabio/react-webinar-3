import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginPage from './login';
import ProfileContainer from '../containers/profile-container';
import useSessionGuard from '../hooks/use-session-guard';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  useSessionGuard(); //вызов глобального хука
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path="/profile" element={<ProfileContainer />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
