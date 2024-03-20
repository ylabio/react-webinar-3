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
import { Navigate } from 'react-router-dom';
import Spinner from '../components/spinner';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
    const { t } = useTranslate();
    const activeModal = useSelector(state => state.modals.name);
    const user = useSelector(state => state.auth.user); 
    const waiting = useSelector(state => state.auth.waiting); 
    const [initialLoading, setInitialLoading] = useState(true); 
    const store = useStore();
    useInit(async () => {
        try {
            await store.actions.auth.autoLogin();
        } finally {
            setInitialLoading(false); 
        }
    }, []);
    if (initialLoading) {
        return <Spinner />;
    }
   
   
    return (
        <>
            <LoginBox /> 

            <Routes>
                <Route path="/login" element={!user && !waiting ? <LoginPage /> : waiting ? <Spinner /> : <Navigate to="/profile" replace />} />
                <Route path="/profile" element={user ? <ProfilePage /> : !waiting ? <Navigate to="/login" replace /> : <Spinner />} />
                <Route path="/" element={<Main />} />
                <Route path="/articles/:id" element={<Article />} />
            </Routes>

            {activeModal === 'basket' && <Basket />}
        </>
    );
}

export default App;
