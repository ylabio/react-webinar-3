import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth-tool";
import LoginFormContainer from "../../containers/login-form-container";

function AuthPage() {
  const store = useStore();

  const { t, lang, setLang } = useTranslate();

  const callbacks = {
    setLang: useCallback(
      (lang) => {
        store.actions.catalog.setParams({ lang });
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
      {/* форма для авторизации */}
      <LoginFormContainer />
    </PageLayout>
  );
}

export default memo(AuthPage);
