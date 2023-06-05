import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import Form from '../../components/form';
import Header from '../../containers/header';

function Login() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    waiting: state.user.waiting,
    error: state.user.error,
  }));

  useInit(() => {
    if (select.isAuth) return navigate('/profile');
    // console.log(select.waiting);
  }, [select.isAuth]);

  const callbacks = {
    onSubmit: useCallback((data) => store.actions.user.login(data), []),
    setError: useCallback(
      (message) => store.actions.user.setError(message),
      []
    ),
  };
  const { t } = useTranslate();

  return (
    <PageLayout head={<Header />}>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting} hide={true}>
        <Form
          onSubmit={callbacks.onSubmit}
          setError={callbacks.setError}
          title={t('loginTitle')}
          loginLabel={t('loginLabel')}
          passwordLabel={t('passwordLabel')}
          btnLogin={t('formBtnSubmit')}
          error={select.error}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
