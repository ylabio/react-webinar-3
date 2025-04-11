import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import UserLogin from '../../components/user-login';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import UserPanel from '../../components/user-panel';
import UserButton from '../../containers/user-button';
import usePageTitle from '../../hooks/use-pageTitle';

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const pageTitle = usePageTitle({ defaultTitle: 'title' });

  const select = useSelector(state => ({
    token: state.user.token,
    waiting: state.user.waiting,
    error: state.user.error,
  }));

  const callbacks = {
    handleLogin: useCallback(
      async formData => {
        await store.actions.user.login(formData);
        if (store.getState().user.token) {
          navigate('/profile');
        }
      },
      [navigate, store],
    ),
    onClearError: useCallback(() => store.actions.user.setError(null), [store]),
  };

  useInit(() => {
    if (select.token) {
      navigate('/profile');
    }
  }, [select.token, navigate]);

  return (
    <>
      <UserPanel>
        <UserButton />
      </UserPanel>
      <Head title={pageTitle}>
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
