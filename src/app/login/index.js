import { memo, useCallback, useEffect, useState } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginCard from "../../components/login-card";
import Spinner from "../../components/spinner";
import LoginBanner from "../../containers/login-banner";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState('')
  
  const select = useSelector((state) => ({
    waiting: state.user.waiting,
    userInfo: state.user.userInfo,
  }));

  const { t } = useTranslate();

  const callbacks = {
    onLogin: useCallback(({ login, password }) => {
      store.actions.user.login({ login, password })
        .then(({success, error}) => {
          if (success) {
            navigate(location.state && location.state.redirectTo ? `${location.state.redirectTo}` : '/');
          } else {
            setLoginError(error)
          }
        })
    }, [store]),
  };

  return (
    <PageLayout>
      <LoginBanner />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={false}>
        <LoginCard
          t={t}
          onLogin={callbacks.onLogin}
          loginError={loginError}
          waiting={select.waiting}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
