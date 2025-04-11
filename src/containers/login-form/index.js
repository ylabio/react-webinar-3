import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import LoginForm from '../../components/login-form';

function LoginFormContainer() {
  const store = useStore();
  const { t } = useTranslate();

  const callbacks = {
    onLogin: useCallback(
      async credentials => {
        try {
          const success = await store.actions.auth.login(credentials);
          return success; // Возвращаем результат авторизации
        } catch (error) {
          throw error; // Пробрасываем ошибку дальше
        }
      },
      [store],
    ),
  };

  return (
    <LoginForm
      buttonMessage={t('login.button')}
      header={t('login.enter')}
      loginLabel={t('login.login')}
      loginPlaceholder={t('login.text')}
      passwordLabel={t('login.password')}
      passwordPlaceholder={t('password.text')}
      onSubmit={callbacks.onLogin}
    />
  );
}

export default memo(LoginFormContainer);
