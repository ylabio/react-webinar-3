import { memo, useCallback } from 'react';
import Head from '../../components/head';
import LoginCard from '../../components/login-card';
import PageLayout from '../../components/page-layout';
import AuthNavigation from '../../containers/auth-navigation';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    error: state.auth.error,
  }));

  const { t } = useTranslate();

  const callbacks = {
    onLogin: useCallback((login, password) => store.actions.auth.signIn(login, password), [store]),
    onClearError: useCallback(() => store.actions.auth.setError(null), [store]),
  };

  return (
    <>
      <AuthNavigation />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginCard
          onLogin={callbacks.onLogin}
          clearError={callbacks.onClearError}
          error={select.error}
          t={t}
        />
      </PageLayout>
    </>
  );
}

export default memo(Login);
