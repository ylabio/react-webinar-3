import { memo, useEffect } from "react";
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
import { useCallback } from "react";

function ProfilePage() {
  const store = useStore();
  const select = useSelector((state) => ({
    user: state.auth.user,
    token: state.auth.token,
  }));

  const { t } = useTranslate();
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка доступа пользователя при загрузке страницы профиля
    if (!select.user || !select.token) {
      navigate("/login");
    }
  }, [select.user, select.token, navigate]);


  const handleLogout = async () => {
    await store.actions.auth.handleLogout();
    navigate("/login");
  };

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
