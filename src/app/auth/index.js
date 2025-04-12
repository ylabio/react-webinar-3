import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import AuthForm from '../../components/auth-form';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import ProfileHeader from '../../components/profile-header';

function Auth() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error,
    userName: state.auth.userName,
  }));
  const linksNav = {
    in: '/login',
    me: '/profile',
    out: '/',
  };
  const callbacks = {
    onLogin: useCallback(
      data => {
        store.actions.auth.login(data, () => {
          store.actions.catalog.resetParams();
          navigate('/');
        });
      },
      [store, navigate],
    ),
    onRemoveError: useCallback(() => store.actions.auth.removeError(), [store]),
  };

  const { t } = useTranslate();

  return (
    <>
      <ProfileHeader isAuth={select.isAuth} userName={select.userName} links={linksNav} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <AuthForm
          t={t}
          onSubmit={callbacks.onLogin}
          error={select.error}
          isAuth={select.isAuth}
          removeError={callbacks.onRemoveError}
        />
      </PageLayout>
    </>
  );
}

export default memo(Auth);
