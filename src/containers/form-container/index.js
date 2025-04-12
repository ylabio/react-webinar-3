import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import FormLayout from '../../components/form-layout';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function FormContainer() {

  const store = useStore();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const {t} = useTranslate();
  const labelSubmitButton = t('auth.signInButton');

  const select = useSelector(state => ({
    data: state.user.data,
    waiting: state.user.waiting,
    error: state.user.error,
  }));

  const callbacks = {
    // Добавление в корзину
    sign: useCallback(() => {
      store.actions.user.sign({login, password});
    }, [store, login, password]),

  };

  useEffect(() => {
    store.actions.user.clear()
  }, []);

  const fields = useMemo(() => [
    {
      name: 'login',
      type: 'text',
      label: t('auth.loginLabel'),
      placeholder: t('auth.loginPlaceholder'),
      value: login,
      onChange: setLogin,
    },
    {
      name: 'password',
      type: 'password',
      label: t('auth.passwordLabel'),
      placeholder: t('auth.passwordPlaceholder'),
      value: password,
      onChange: setPassword,
    },
  ], [login, password, setLogin, setPassword, t]);


  return (
    <FormLayout
      onSubmit={callbacks.sign}
      fields={fields}
      error={select.error}
      control={labelSubmitButton}
      disable={select.waiting}/>
  );
}

export default memo(FormContainer);
