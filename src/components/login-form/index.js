import { memo, useCallback, useEffect, useState } from 'react';
import useStore from '../../hooks/use-store';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginFormView from '../login-form-view';
import useAuth from '../../hooks/use-auth';
import useSelector from '../../hooks/use-selector';

function LoginForm({ t }) {
  const store = useStore();
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/profile';

  /* const { isAuth } = useSelector(state => state.user); //если нам не нужна проверка с запросом валидности токена при переходе на страницу логина, можно только поле из стора брать

  useEffect(() => {
    console.log(isAuth);
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth]); */
  useAuth({ redirectIfAuthed: true });
  
  const handleLogin = useCallback(async () => {
    try {
      const response = await store.actions.user.loginUser({ login, pass });
      if (response.error) setError(response.error);
    } catch (e) {
      setError(t('login.error'));
    }
  }, [login, pass, store, t]);

  return (
    <LoginFormView
      login={login}
      pass={pass}
      error={error}
      onLoginChange={setLogin}
      onPassChange={setPass}
      onSubmit={handleLogin}
      t={t}
    />
  );
}

LoginForm.propTypes = {};

export default memo(LoginForm);
