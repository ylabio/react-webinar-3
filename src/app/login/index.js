import { useNavigate } from "react-router-dom";
import LoginForm from "../../containers/loginForm";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import LogButton from "../../components/LogButton";
import { removeLocalStorage } from "../../utils";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";


function Login () {
    const {t} = useTranslate();
    const navigate = useNavigate();
    const store = useStore();
    const select = useSelector(state => ({
        username: state.user.username, 
        error: state.user.error, 
    }));
    const handleNavigateToLogin = () => {
        navigate("/login");
    };

    const handleExit = () => {
        removeLocalStorage("token");
        removeLocalStorage("name");
        store.actions.user.resetState();
    };

    return(
        <PageLayout>
            {select.username? 
                <LogButton title={t("exit")} info={select.username} onClick={handleExit}/> 
                : 
                <LogButton title={t("entrance")} onClick={handleNavigateToLogin}
            />}
            <Head title={t('title')}></Head>
            <Navigation />
            <LoginForm/>
        </PageLayout> 
    )
}

export default Login;