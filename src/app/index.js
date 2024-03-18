import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import { useNavigate } from 'react-router-dom';
import useStore from '../hooks/use-store';
import useInit from "../hooks/use-init";
import ProfilePage from "./profile"
import LoginPage from "./auth"
import LoginButton from '../components/login-button';
import UserProfileButton from '../components/userProfile-button';
import useTranslate from '../hooks/use-translate';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
    const { t } = useTranslate();
    const activeModal = useSelector(state => state.modals.name);
    const store = useStore();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);

    useInit(async () => {
        await store.actions.auth.autoLogin();
    }, []);

    
    const isLoggedIn = !!localStorage.getItem('authToken');

    const handleLogoutClick = async () => {
        await store.actions.auth.logout();
        navigate('/login');
    };
    const handleLoginClick = () => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    };
    const renderLoginBox = () => {
        if (!isLoggedIn) {
            return <LoginButton title={t('auth.login')} onLoginClick={handleLoginClick} />;
        } else {
            console.log(auth);
            return <UserProfileButton title={t('auth.logout')} user={auth.user} onLogoutClick={handleLogoutClick} />;
        }
    };
    

  return (
    <>
      <Routes>
              <Route path={'/login'} element={<LoginPage isLoggedIn={renderLoginBox()} />} />
              <Route path={'/profile'} element={<ProfilePage isLoggedIn={renderLoginBox()} />} />
              <Route path={''} element={<Main isLoggedIn={renderLoginBox()} />}  />
              <Route path={'/articles/:id'} element={<Article isLoggedIn={renderLoginBox()} />} />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
