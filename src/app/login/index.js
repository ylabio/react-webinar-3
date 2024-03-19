import AuthTool from "../../containers/auth-tool";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import { memo, useCallback, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import AuthForm from "../../components/auth-form";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function Login() {
    const store = useStore();
    const { t } = useTranslate();
    const navigate = useNavigate()

    const select = useSelector(state => ({
        error: state.user.error,
    }));

    
    const callbacks = {
        // Авторизация
        auth: useCallback((login, password) => store.actions.user.authorization(login, password), [store]),
        // Обработка успешной авторизации
        onSuccess: useCallback(() => {
            console.log("test_3");
            navigate('/profile')
        }, [store]),
        onClosePage: useCallback(() => store.actions.user.removeError(), [store])
    }

    useEffect(() => {
        return () => callbacks.onClosePage()
    }, [])

    return (
        <PageLayout>
            <AuthTool />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <AuthForm onSuccess={callbacks.onSuccess} error={select.error} onAuth={callbacks.auth} title={t('enter')} login={t("login")} password={t("password")} enter={t("auth")} />
        </PageLayout>
    )
}

export default memo(Login)