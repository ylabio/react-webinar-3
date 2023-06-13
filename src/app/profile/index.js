import {memo, useEffect} from "react";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import ProfileInfo from "../../components/profile-info";
import {Navigate, useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";

function Profile() {

  const store = useStore();
  const {t} = useTranslate();
  const navigate = useNavigate();



  const select = useSelector((state) => ({
    user: state.profile.user,
    isLogin: state.login.isLogin,
    waiting: state.profile.waiting
  }));

  useInit(async () => {
    await store.actions.profile.getUser()
  }, [])

  useEffect(() => {
    if (!select.isLogin) navigate("/login");
  }, [select.isLogin]);

  return (
    <PageLayout>
      <Auth/>
      <Head title={t("title")}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileInfo user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);