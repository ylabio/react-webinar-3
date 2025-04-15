import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from "../../../hooks/use-store";
import useInit from "../../../hooks/use-init";
import useTranslate from "../../../hooks/use-translate";
import useSelector from "../../../hooks/use-selector";

import Head from "../../../components/head";
import LocaleSelect from "../../../containers/locale-select";
import PageLayout from "../../../components/page-layout";
import Navigation from "../../../containers/navigation";
import ProfileInfo from "../../../components/user/profile-info";
import AuthInfo from "../../../components/user/auth-info";

function Profile() {
  const { t } = useTranslate();


  const select = useSelector(state => ({
    user: state.user.data,
  }));


  return (
    <>
      <AuthInfo />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
          <ProfileInfo user={select.user}/>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
