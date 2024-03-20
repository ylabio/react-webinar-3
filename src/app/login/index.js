import { memo, useState } from 'react';
import PageLayout from "../../components/page-layout";
import LoginLine from "../../components/login-line";
import Head from "../../components/head";
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/login-form';
import Navigation from '../../containers/navigation';
import authServices from '../../services/authServices';

function LoginPage() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (login, password) => {
        console.log(login, password);
        // authServices.login(login, password);
    };

    const { t } = useTranslate();

    return (
        <PageLayout>
            <LoginLine />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head> 
            <Navigation />
            <LoginForm
                login={login}
                password={password}
                onChangeLogin={setLogin}
                onChangePassword={setPassword}
                onSubmit={handleSubmit}
            />
        </PageLayout>
    )
}

export default memo(LoginPage);

