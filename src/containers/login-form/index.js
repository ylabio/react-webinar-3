import { memo, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Form from '../../components/form';
import { validErrorMessage } from '../../utils';

function LoginForm() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.session.user,
    error: state.session.error,
  }));

  useEffect((() => {
    store.actions.session.clearError();
    if (select.user) {
      navigate(-1);
    }
  }), [select.user]);

  const { t } = useTranslate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const params = [
    {
      title: `${t('login')}`,
      placeholder: `${t('placeholderLogin')}`,
      value: login,
      name: 'login',
      onChange: (value) => setLogin(value),
      delay: 0,
    },
    {
      title: `${t('password')}`,
      placeholder: `${t('placeholderPassword')}`,
      value: password,
      name: 'password',
      onChange: (value) => setPassword(value),
      delay: 0,
    },
  ];

  const callbacks = {
    onLoginIn: useCallback(() => store.actions.session.logIn(login, password), [store, login, password]),
  };

  return (
    <>
      <Form
        title={t('logIn')}
        padding={'medium'}
        params={params}
        buttonTitle={t('logInButton')}
        onClick={callbacks.onLoginIn}
        error={validErrorMessage(select.error, t('incorrectData'))}
      />
    </>
  );
}

export default memo(LoginForm);
