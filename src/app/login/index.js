import { memo, useCallback } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from '../../containers/login-menu';
import useTranslate from '../../hooks/use-translate';
import LoginForm from '../../components/login-form';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';

function Login() {
    const { t } = useTranslate();
    const store = useStore();

    const select = useSelector(state => ({
        error: state.login.error,
        auth: state.profile.auth,
        loading: state.profile.loading,
    }));

    const callbacks = {
        onLogin: useCallback((username, password) => { store.actions.login.login(username, password) }, [store]),
        onToken: useCallback(() => { store.actions.profile.getUser() }, [store])
    }


    if (select.auth) {
        return <Navigate to="/" />;
    }

    return (
        <PageLayout>
            <LoginMenu />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <LoginForm onLogin={callbacks.onLogin} onToken={callbacks.onToken} error={select.error} loading={select.loading} t={t} />
        </PageLayout>
    );
}

export default memo(Login);