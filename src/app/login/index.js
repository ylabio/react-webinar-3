import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Entrance from '../../components/entrance';
import Authorization from "../../components/authorization";
import LocaleSelect from "../../containers/locale-select";
function Login() {
    const {t} = useTranslate();
  return (
    <PageLayout>
      <Entrance/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Authorization/>
    </PageLayout>
  );
}

export default memo(Login);
