import React, { memo, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import PageLayout from "../../components/page-layout";
import ProfileCart from "../../components/profile-cart";
import ButtonOut from "../../components/button-out";
import Navigation from "../../containers/navigation";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const store = useStore();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const select = useSelector((state) => ({
    user: state.auth.user,
    token: state.auth.token,
  }));

  const { t } = useTranslate();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!select.user || !select.token) {
        navigate('/login');
      } else {
        await store.actions.auth.handleAuth();
      }
    };

    if (select.user && select.token) {
      checkAuthentication();
    }
  }, [select.user, select.token, navigate, store.actions.auth]);

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
