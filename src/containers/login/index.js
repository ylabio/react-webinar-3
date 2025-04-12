import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import LoginForm from '../../components/login-form';
import AuthButton from '../auth-button';
import Navigation from '../navigation';
import PageLayout from '../../components/page-layout';
import HeadContainer from '../head-container';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const { error } = useSelector(state => state.session);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await store.actions.session.signIn({ login, password });
    if (success) navigate('/');
  };

  return (
    <>
      <AuthButton/>
      <HeadContainer/>
      <PageLayout>
        <Navigation/>
        <LoginForm
          t={t}
          login={login}
          password={password}
          error={error}
          onChangeLogin={setLogin}
          onChangePassword={setPassword}
          onSubmit={handleSubmit}
        />
      </PageLayout>
    </>
  );
}

export default memo(Login);
