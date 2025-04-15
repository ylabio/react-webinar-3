import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import UserLogin from '../../components/user-login';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import UserPanel from '../../components/user-panel';
import UserButton from '../../containers/user-button';
import useTranslate from '../../hooks/use-translate';

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    token: state.authentication.token,
    waiting: state.authentication.waiting,
    error: state.authentication.error,
  }));

  const callbacks = {
    handleLogin: useCallback(
      async formData => {
        await store.actions.authentication.login(formData);
        if (store.getState().authentication.token) {
          await store.actions.user.fetchUserProfile();
        }
      },
      [navigate, store],
    ),
    onClearError: useCallback(() => store.actions.authentication.setError(null), [store]),
  };

  return (
    <>
      <UserPanel>
        <UserButton />
      </UserPanel>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <UserLogin
          onSubmit={callbacks.handleLogin}
          error={select.error}
          clearError={callbacks.onClearError}
        />
      </PageLayout>
    </>
  );
}

export default memo(Login);
