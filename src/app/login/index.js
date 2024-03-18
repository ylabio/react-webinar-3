import { memo, useInsertionEffect } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import UserPanel from "../../containers/user-panel";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import LoginForm from "../../components/login-form";

function LoginPage() {

    const store = useStore();
  
    useInsertionEffect(() => {
      store.actions.catalog.initParams();
      store.actions.catalog.getCategories();
    }, [], true);
  
    const {t} = useTranslate();
  
    return (
      <PageLayout>
        <UserPanel />
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation/>
        <LoginForm />
      </PageLayout>
    );
  }
  
  export default memo(LoginPage);