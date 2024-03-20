import { memo, useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth-tool";
import useSelector from "../../hooks/use-selector";
import ProfileComponent from "../../components/profile-component";
import Spinner from "../../components/spinner";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const store = useStore();

  const { t, lang, setLang } = useTranslate();

  const navigate = useNavigate();

  const select = useSelector((state) => ({
    userData: state.user.userData,
    isLoading: state.user.waiting,
  }));

  useInit(
    () => {
      store.actions.locale.initLocaleParams(lang);
    },
    [lang],
    true
  );

  useEffect(() => {
    if (!select.userData) {
      navigate("/login");
    }
  }, [select.userData]);

  const callbacks = {
    setLang: useCallback(
      (lang) => {
        store.actions.locale.setLocaleParams(lang);
        setLang(lang);
      },
      [store, lang]
    ),
  };

  return (
    <PageLayout head={<Auth />}>
      <Head title={t("title")}>
        <LocaleSelect onChange={callbacks.setLang} value={lang} />
      </Head>
      <Navigation />
      <Spinner active={select.isLoading}>
        <ProfileComponent t={t} userData={select.userData} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(ProfilePage);
