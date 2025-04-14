import { memo, useCallback, useLayoutEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form'
import { useNavigate } from 'react-router-dom'

/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();
  const navigate = useNavigate()

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    userAuth: state.user.isAuth,
    error: state.user.error
  }));

  const { t } = useTranslate();

  useLayoutEffect(() => {
    callbacks.resetError()
    if(select.userAuth) navigate(-1)
  },[store.state.user.isAuth])

  const callbacks = {
    onSubmit: useCallback(signOptions => store.actions.user.auth(signOptions)),
    resetError: useCallback(() => store.actions.user.resetError())
  }

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <LoginForm error={select.error} onSubmit={callbacks.onSubmit}/>
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Login);
