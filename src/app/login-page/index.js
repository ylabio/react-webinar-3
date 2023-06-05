import {memo, useCallback} from "react";
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import LoginSide from "../../components/login-side";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import LoginDetail from "../../components/login-detail";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import {useNavigate} from "react-router-dom";

function LoginPage() {
  const store = useStore();
  const {t} = useTranslate();

  const navigate = useNavigate();

  const select = useSelector(state => ({
    serverError: state.user.serverError,
    waiting: state.user.waiting,
    loginStatus: state.user.loginStatus,
    userName: state.user.userProfile.name
  }));

  useInit(() => {
    const preload = async () => {
      if (await store.actions.user.checkLoginStatus()) {
        navigate('/');
      }
    }
    preload().catch();
  }, []);

  const callbacks = {
    login: useCallback((login, password) => {
      store.actions.user.login(login, password)
        .then((statusOk) => {
          if (statusOk) {
            navigate(-1);
          }
        });
      }, [store]),
    logout: useCallback(() => store.actions.user.logout(), [store])
  }

  return (
    <PageLayout>
      <LoginSide loginStatus={select.loginStatus} userName={select.userName} onLogout={callbacks.logout} t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <LoginDetail errorMessage={select.serverError} onLogin={callbacks.login} waiting={select.waiting} t={t} />
    </PageLayout>
  );
}

export default memo(LoginPage);
