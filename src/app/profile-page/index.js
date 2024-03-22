import React, { useEffect, memo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import PageLayout from "../../components/page-layout";
import ProfileCart from "../../components/profile-cart";
import ButtonOut from "../../components/button-out";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import { useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";

function ProfilePage() {
  const store = useStore();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const select = useSelector((state) => ({
    user: state.auth.user,
    token: state.auth.token,
  }));

  const { t } = useTranslate();

  useInit(() => {
    store.actions.catalog.initParams();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      await store.actions.auth.handleAuth();
    };

    checkAuth();
  }, [store.actions.auth]); // Передаем только store.actions.auth в массив зависимостей

  const handleLogout = async () => {
    await store.actions.auth.handleLogout();
    navigate("/");
  };

  if (!select.user || !select.token) {
    return null; // Пока данные не загружены, компонент ничего не рендерит
  }

  return (
    <PageLayout>
      <ButtonOut title="Выход" onClick={handleLogout} user={select.user} />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCart user={select.user} />
    </PageLayout>
  );
}

export default memo(ProfilePage);
