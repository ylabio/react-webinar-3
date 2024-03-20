import { memo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/profile-card";
import Head from "../../components/head";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import LoginNav from '../../components/login-nav';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from '../../hooks/use-init';

function Profile() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    isLogin: state.login.isLogin,
    waiting: state.profile.waiting,

    name: state.profile.userData.name,
    email: state.profile.userData.email,
    phone: state.profile.userData.phone,
  }));

  const callbacks = {
    onGetProfile: useCallback(() => store.actions.profile.getProfileByToken(), [store]),
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
  }

  useInit(() => {
   callbacks.onGetProfile();
  }, []);

  const handleOnclick =()=>{
    callbacks.onLogout();
    navigate('/login');
  }

  useEffect(() => {
    if (!select.isLogin) {
     return navigate('/login')
   }
  }, [select.isLogin])

  return (
    <PageLayout>
      <LoginNav onClick={handleOnclick}/>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard t={t} name={select.name} email={select.email} phone={select.phone}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);