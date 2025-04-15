import { memo, useCallback, useEffect, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import TopBar from '../../containers/top-bar';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import LoginBlock from '../../components/login-block';
import Spinner from '../../components/spinner';

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [data, setData] = useState({
    login: '',
    password: '',
  });

  const select = useSelector(state => ({
    errorMessage: state.auth.errorMessage,
    waiting: state.auth.waiting,
  }));

  useEffect(() => {
    store.actions.auth.setWaiting(false);
    if (select.errorMessage) {
      store.actions.auth.resetErrorMessage();
    }
  }, []);

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value, name) => {
      setData(prevState => ({ ...prevState, [name]: value.trim() }));
    }, []),
    // Колбек для редиректа на предыдущую страницу
    navigateToPrevPath: useCallback(() => {
      const path = state === null ? '/profile' : state.prevPath
      navigate(path);
    }, []),
    onSubmit: useCallback(
      e => {
        e.preventDefault();
        store.actions.auth.login(data, callbacks.navigateToPrevPath);
      },
      [data],
    ),
  };

  const { t } = useTranslate();

  return (
    <>
      <TopBar />
      <PageLayout>
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <Spinner active={select.waiting}>
          <LoginBlock
            t={t}
            data={data}
            onChange={callbacks.onChange}
            onSubmit={callbacks.onSubmit}
            errorMessage={select.errorMessage}
          />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Login);
