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
import LoginBox from '../containers/login-line';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
    const { t } = useTranslate();
    const activeModal = useSelector(state => state.modals.name);
    const store = useStore();
    useInit(async () => {
        await store.actions.auth.autoLogin();
    }, []);

    return (
        <>
            <LoginBox /> 

            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/" element={<Main />} />
                <Route path="/articles/:id" element={<Article />} />
            </Routes>

            {activeModal === 'basket' && <Basket />}
        </>
    );
}

export default App;
