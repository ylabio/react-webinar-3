import React, { useCallback } from "react";
import { Navigate } from "react-router-dom";
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
  const { t } = useTranslate();
  const userState = useSelector((state) => state.user);
  const token = userState.token;

  // Инициализация данных профиля при авторизации
  useInit(() => {
    if (token) {
      store.actions.profile.loadData(token);
    }
  }, [token, store.actions.profile]);

  const user = useSelector((state) => state.profile.user);
  const profile = { ...user.profile };

  const exitProfile = useCallback(() => {
    store.actions.user.signOut();
  }, [store]);

  // Перенаправление на страницу авторизации, если пользователь не авторизован
  if (!token) {
    return <Navigate replace to="/login" />;
  }

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
