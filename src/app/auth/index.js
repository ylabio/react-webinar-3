import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import LoginBox from '../../components/loginBox';
import ProfileCard from '../../components/profile-card';
/**
 * Главная страница - первичная загрузка каталога
 */
const LoginPage = (props) => {
    const store = useStore();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    useInit(async () => {
        store.actions.auth.resetLoginError();
        return () => {

        };
    }, [store.actions.auth]);
    const handleLogin = async (event) => {
        event.preventDefault();
        const { username, password } = event.target.elements;
        try {
            await store.actions.auth.login(username.value, password.value);
            navigate('/'); 
        } catch (error) {
            console.error('Ошибка входа', error);
           
        }
    };

    const { t } = useTranslate();

    return (
        <PageLayout>
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <LoginBox title={t('auth.title')} login={t('auth.title-login')} password={t('auth.title-password')} button={t('auth.title-button')}  onLogin={handleLogin} loginError={auth.loginError} />
        </PageLayout>
    );
};

export default memo(LoginPage);
