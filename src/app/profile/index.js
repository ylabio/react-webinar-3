import React, { useCallback, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import LoginButton from "../../components/login-button";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Head from "../../components/head";
import ProfileCard from "../../components/profile-card";

function Profile() {
  const store = useStore();
  const user = useSelector((state) => state.profile.user);
  const profile = { ...user.profile };
  const { t } = useTranslate();
  let navigate = useNavigate();

  const select = useSelector((state) => ({
    user: state.profile.user,
  }));

  useEffect(() => {
    if (!select.user) navigate("/login");
  }, [select.user]);

  const exitProfile = useCallback(() => {
    store.actions.user.signOut();
  }, [store]);

  return (
    <PageLayout head={<LoginButton text={profile.name} onExit={exitProfile} />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard user={user} profile={profile} />
    </PageLayout>
  );
}

export default Profile;
