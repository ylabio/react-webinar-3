import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from "../../../hooks/use-store";
import useInit from "../../../hooks/use-init";
import Head from "../../../components/head";
import LocaleSelect from "../../../containers/locale-select";
import PageLayout from "../../../components/page-layout";
import Navigation from "../../../containers/navigation";
import LoginForm from "../../../components/forms/login-form";
import AuthInfo from "../../../components/user/auth-info";
import useTranslate from "../../../hooks/use-translate";
import useSelector from "../../../hooks/use-selector";

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const select = useSelector(state => state.user);


  const handleSubmit = async () => {
    await store.actions.user.login(login, password);

      navigate('/profile');
  };


  return (
    <>
      <AuthInfo />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm
          login={login}
          password={password}
          error={select.error}
          onChangeLogin={(value) => setLogin(value)}
          onChangePassword={(value) => setPassword(value)}
          onSubmit={handleSubmit}
          isLoading={select.isLoading}
        />
      </PageLayout>
    </>
  );
}

export default memo(Login);
