import { memo } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import UserPanel from "../../containers/user-panel";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileInfo from "../../containers/profile-info";

function Profile() {

    const store = useStore();
  
    useInit(() => {
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
        <ProfileInfo />
      </PageLayout>
    );
  }
  
  export default memo(Profile);