import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Head from '../../components/head';
import PageLayout from '../../components/layouts/page-layout';
import LoginForm from '../../components/login/login-form';
import Spinner from "../../components/spinner";
import LocaleSelect from '../../containers/locale-select';
import LoginBar from '../../containers/login-bar';
import Navigation from '../../containers/navigation';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from "../../hooks/use-store";
import useTranslate from '../../hooks/use-translate';

/**
 * Страница логина. Инпуты формы тут без двунаправленного связывания, пока не надо.
 */

function Login() {

  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslate();
  const store = useStore();

  const { status, waiting, error } = useSelector(state => ({
    status: state.session.status,
    waiting: state.login.waiting,
    error: state.login.error
  }));

  useInit(() => {
    if (error)
      store.actions.login.resetError(); // сброс ошибки при открытии формы, если осталась
  }, [], true);

  useEffect(() => {
    if (status == 'success') { // Переход туда, откуда пришли
      const nonLoginPrevPageExists = location.state?.from && location.state?.from.pathname != location.pathname;
      nonLoginPrevPageExists ? navigate(location.state.from.pathname, { replace: true }) : navigate('/', { replace: true });
    }
  }, [status]);

  const callbacks = {
    onLoginChange: useCallback(login => store.actions.login.setLogin(login), [store]),
    onPasswordChange: useCallback(password => store.actions.login.setPassword(password), [store]),
    onEnter: useCallback(() => store.actions.login.login(), [store])
  }

  return (
    <PageLayout>
      <LoginBar />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={waiting}>
        <LoginForm
          onLoginChange={callbacks.onLoginChange}
          onPasswordChange={callbacks.onPasswordChange}
          onEnter={callbacks.onEnter}
          error={error}
          t={t}
        />
      </Spinner>
    </PageLayout >
  )
};

export default React.memo(Login);