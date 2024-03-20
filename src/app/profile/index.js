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
  // test_1 123456
function Profile() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    isLogin: state.login.isLogin,
    isValid: state.login.isValid,
    errorMessage: state.login.errorMessage,

    waiting: state.login.waiting,
    name: state.login.userData.name,
    email: state.login.userData.email,
    phone: state.login.userData.phone,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
  }

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