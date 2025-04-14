import { memo, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    error: state.user.error,
    waiting: state.user.waiting,
    user: state.user.user,
  }));

  const callbacks = {
    onLogin: useCallback(
      data => {
        store.actions.user.login(data);
      },
      [store],
    ),
    onRemoveError: useCallback(() => store.actions.user.removeError(), [store]),
  };
  useEffect(() => {
    callbacks.onRemoveError();
  }, []);

  const { t } = useTranslate();

  return (
    <>
      <Spinner active={select.waiting}>
        <ProfileHeader isAuth={select.isAuth} userName={select.user?.profile.name} />
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
      </Spinner>
    </>
  );
}

export default memo(Auth);
