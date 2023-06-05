import { useCallback, useState } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import LoginForm from '../../components/login-form';
import Navigation from '../../containers/navigation';
import useStore from '../../hooks/use-store';
import UserControls from '../../containers/user-controls';
import { Navigate, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';
import useSelector from '../../hooks/use-selector';

function Auth() {
  const store = useStore();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({login: '', password: ''});
  const [error, setError] = useState({message: '', isError: false});
  const {t} = useTranslate();
  const select = useSelector(state => ({
    user: state.user
  }));

  const callbacks = {
    login: useCallback(({login, password}) => store.actions.user.login({login, password}))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await callbacks.login(userData);
      setError({message: '', isError: false});
      navigate('/');
    } catch (err) {
      setError({message: err.message, isError: true});
    }
  }

  if (select.user.authStatus === 'Auth') {
    return (
      <Navigate to='/profile' />
    )
  }

  return (
    <PageLayout>
      <UserControls />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm userData={userData} setUserData={setUserData} onSubmit={onSubmit} error={error} t={t}/>
    </PageLayout>
  );
}

export default Auth;