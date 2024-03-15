import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Auth from '../../components/auth';
import LoginBody from '../../components/login-body';

/**
 * Страница логина
 */
function Login() {

  

  const store = useStore();

  const select = useSelector(state => ({
    error: state.user.amount,
  }));

  const callbacks = {
    // авторизация
    onLogin: useCallback((data) => store.actions.user.auth(data), [store])
  }

  return (
    <PageLayout>
      <Auth/>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginBody onLogin={callbacks.onLogin} serverError={select.error}/>
    </PageLayout>
  );
}

export default memo(Login);
