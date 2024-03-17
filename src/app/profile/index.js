import React, {useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import UserPanel from "../../containers/user-panel";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import ProfileInfo from "../../components/profile-info";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate()

  const select = useSelector(state => ({
    user: state.user.data
  }))

  useEffect(() => {
    if (!select.user.token) navigate('/login')
  }, [select.user])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserPanel />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo user={select.user} t={t} />
    </PageLayout>
  );
};

export default React.memo(Profile);
