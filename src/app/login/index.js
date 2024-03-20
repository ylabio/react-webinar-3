import {memo, useCallback, useState} from 'react';
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Head from '../../components/head';
import LoginPage from '../../components/login-page';
import Navigation from '../../containers/navigation';
import {useNavigate} from 'react-router-dom';
import AuthButtons from '../../containers/auth-buttons';

function Login() {

  const store = useStore();

  const select = useSelector(state => ({
    loginData: state.login,
    userData: state.login.userData,
    error: state.login.error,
  }));

  const navigate = useNavigate();

  const callbacks = {
    onLogin: useCallback((login, password) => store.actions.login.login({login: login, password: password}), [store]),
    onGetProfile: useCallback(() => store.actions.login.getProfile(), []),
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await callbacks.onLogin(login, password);
    if (select.userData.profile) {
      navigate('/profile');
    }
  }

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthButtons></AuthButtons>
      <Head title={t('title')} link={'login'}>
        <LocaleSelect/>
      </Head>
      <Navigation></Navigation>
      <LoginPage error={select.error} onSetLogin={setLogin} onSetPassword={setPassword} onSubmit={submitForm}></LoginPage>
    </PageLayout>
  )
}

export default memo(Login);