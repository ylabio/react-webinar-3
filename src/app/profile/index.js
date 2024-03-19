import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Entrance from '../../components/entrance';
import LocaleSelect from "../../containers/locale-select";
import UserData from "../../components/user-data";
function Profile() {
    const {t} = useTranslate();
  return (
    <PageLayout>
      <Entrance/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserData/>
    </PageLayout>
  );
}

export default memo(Profile);
