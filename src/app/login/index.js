import { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import Head from '../../components/head';
import LoginForm from '../../components/login-form';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';

function Login() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useInit(() => {
    store.actions.session.removeError();
  }, []);

  const select = useSelector(state => ({
    error: state.session.error,
    user: state.session.username,
    waiting: state.session.waiting,
  }));

  const callbacks = {
    onSubmit: data => {
      store.actions.session.loginUser(data);
      const { state } = location;
      navigate(state?.from);
    },
  };

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm t={t} onSubmit={callbacks.onSubmit} error={select.error} />
      </PageLayout>
    </>
  );
}

export default memo(Login);
