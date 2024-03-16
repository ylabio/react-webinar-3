import { memo, useEffect } from "react";
import ProfileCard from "../../components/profile-card";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import LoginControl from "../../containers/login-control";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";

function Profile() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    isLogin: state.auth.isLogin,
    waiting: state.auth.waiting,
    user: state.auth.user,
    name: state.auth.user.name,
    phoneNumber: state.auth.user.phoneNumber,
    email: state.auth.user.email,
  }));

  const token = JSON.parse(window.localStorage.getItem("XToken"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <PageLayout>
      <LoginControl />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard
          name={select.name}
          phoneNumber={select.phoneNumber}
          email={select.email}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
