import {memo, useCallback, useEffect} from 'react';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginPanel from "../../containers/login-panel";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

function Login() {
  const {t} = useTranslate();
  const navigate = useNavigate();

  const store = useStore();

  const select = useSelector(state => ({
    token: state.user.token,
    errorMessage: state.user.errorMessage,
  }));

  const callbacks = {
    onAuthorize: useCallback((data) => store.actions.user.authorize(data), [store])
  }

  useEffect(() => {
    if (select.token) {
      navigate("/profile")
    }
  }, [select.token])

  return (
    <PageLayout>
      <LoginPanel/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm errorMessage={select.errorMessage} onSubmit={callbacks.onAuthorize}/>
    </PageLayout>
  );
}

export default memo(Login);
