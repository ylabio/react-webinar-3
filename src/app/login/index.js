import { memo, useState, useEffect, useLayoutEffect } from 'react';
import PageLayout from "../../components/page-layout";
import LoginLine from "../../components/login-line";
import Head from "../../components/head";
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/login-form';
import UserData from '../../components/user-data';
import Navigation from '../../containers/navigation';
import authServices from '../../services/authServices';
import useStore from '../../hooks/use-store';
import useSelector from "../../hooks/use-selector";

function LoginPage() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const store = useStore();

    const userState = useSelector(state => state.user);

    async function getUser() {
        const userResponse = await authServices.user();
        const userData = await userResponse.json();
        const user = userData.result;

        if (user) {
            store.actions.user.setState(user);
        }
    }

    useEffect(() => {

        getUser();
    }, [store]);

    const handleSubmit = async (login, password) => {
        const response = await authServices.login(login, password);
        const data = await response.json();
        const token = data.result.token;

        if (token) {
            localStorage.setItem('token', token);

            getUser();
        }
    };

    const { t } = useTranslate();

    return (
        <PageLayout>
            <LoginLine
                buttonName={userState && userState?.username ? 'Выход' : 'Вход'}
                onClick={
                    userState && userState?.username
                        ?
                        () => {
                            authServices.logout();
                            store.actions.user.setState(null);
                        }
                        :
                        () => { }}
            />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            {
                userState && userState?.username
                    ?
                    <UserData
                        name={userState?.username}
                        phone={userState?.profile?.phone}
                        email={userState?.email}
                    />
                    :
                    <LoginForm
                        login={login}
                        password={password}
                        onChangeLogin={setLogin}
                        onChangePassword={setPassword}
                        onSubmit={handleSubmit}
                    />
            }
        </PageLayout>
    )
}

export default memo(LoginPage);

