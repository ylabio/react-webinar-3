import React, { useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Header from "../../containers/header";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import User from "../../components/user";
import useTranslate from "../../hooks/use-translate";

const Profile = () => {
  const store = useStore();
  const token = localStorage.getItem("token");
  useEffect(() => {
    store.actions.login.getProfile(token);
  }, []);
  const { t } = useTranslate();
  const select = useSelector((state) => ({
    userName: state.login.userProfile.userName,
    userPhone: state.login.userProfile.userPhone,
    userMail: state.login.userProfile.userMail,
  }));

  console.log(select.userName);
  return (
    <PageLayout>
      <Header />
      <Navigation />
      <User
        title={t("userTitle")}
        name={t("userName")}
        phone={t("userPhone")}
        mail={t("userMail")}
        userName={select.userName}
        userPhone={select.userPhone}
        userMail={select.userMail}
      />
    </PageLayout>
  );
};

export default Profile;
