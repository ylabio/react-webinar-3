import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import LoginButton from "../../components/login-button";
import UserProfileButton from "../../components/userProfile-button";
const LoginBox = () => {
    const { t } = useTranslate();
   
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
  



    

    if (!isLoggedIn) {
        return <LoginButton title={t('auth.login')} onLoginClick={handleLoginClick} />;
    } else {
        return <UserProfileButton to={'/profile'} title={t('auth.logout')} user={auth.user} onLogoutClick={handleLogoutClick} />;
    }
};

export default LoginBox;