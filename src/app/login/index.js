import { memo, useEffect, useState, useCallback } from 'react';
import LoginForm from '../../components/login-form';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import LoginMenu from '../../components/login-menu';

function Login() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();

  const [data, setData] = useState({
    login: '',
    password: '',
  });

  const callbacks = {
    onChange: useCallback((value, name) => {
      setData(prevData => ({ ...prevData, [name]: value }));
    }, []),

    onSubmit: useCallback(
      e => {
        e.preventDefault();
        store.actions.user.logIn(data);
      },
      [data],
    ),
  };

  const select = useSelector(state => ({
    name: state.user.name,
    error: state.user.error,
    successfully: state.user.successfully,
  }));

  useEffect(() => {
    if (select.successfully) {
      navigate('/profile');
    }
  });

  useEffect(() => {
    store.actions.user.deleteError();
  }, []);

  return (
    <>
      <LoginMenu />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm
          onSubmit={callbacks.onSubmit}
          data={data}
          onChange={callbacks.onChange}
          error={select.error}
          successfully={select.successfully}
          t={t}
        />
      </PageLayout>
    </>
  );
}

export default memo(Login);
