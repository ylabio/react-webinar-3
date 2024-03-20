import {memo, useCallback, useMemo, useState} from 'react';
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../locale-select';
import Head from '../../components/head';
import LoginPage from '../../components/login-page';
import Navigation from '../navigation';
import {useNavigate} from 'react-router-dom';

function Login() {

  const store = useStore();

  const select = useSelector(state => ({
    userData: state.login.userData,
    error: state.login.error,
  }));

  const callbacks = {
    onLogin: useCallback((login, password) => store.actions.login.login({login: login, password: password}), [store])
  };

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    callbacks.onLogin(login, password);
    if (select.userData) {
      navigate('/profile');
    }
  }

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Head title={t('title')} link={'login'}>
        <LocaleSelect/>
      </Head>
      <Navigation></Navigation>
      <LoginPage error={select.error} onSetLogin={setLogin} onSetPassword={setPassword} onSubmit={submitForm}></LoginPage>
    </PageLayout>
  )
}

export default memo(Login);