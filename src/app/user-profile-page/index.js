import {memo, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import LoginSide from "../../components/login-side";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import UserDetail from "../../components/user-detail";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";

function UserProfilePage() {
  const store = useStore();
  const navigate = useNavigate();
  useInit(() => {
    const preload = async () => {
      if (!(await store.actions.user.checkLoginStatus())) {
        navigate('/login');
      }
    }
    preload().catch();
  }, []);

  const {t} = useTranslate();

  const select = useSelector(state => ({
    userProfile: state.user.userProfile,
    loginStatus: state.user.loginStatus
  }));

  const callbacks = {
    logout: useCallback(() => {
      store.actions.user.logout();
      navigate('/');
    }, [store])
  }

  return (
    <PageLayout>
      <LoginSide onLogout={callbacks.logout} userName={select.userProfile.name} loginStatus={select.loginStatus} t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserDetail userProfile={select.userProfile} t={t}/>
    </PageLayout>
  );
}

export default memo(UserProfilePage);
