import { memo, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import ProfileTools from "../../containers/profile-tools";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import ProfileCard from "../../components/profile-card";
import { useNavigate } from "react-router-dom";


function Profile() {

  const navigate = useNavigate();
  const store = useStore();
  const { t } = useTranslate();
  const select = useSelector(state => ({
    user: state.profile.user,
  }));

  useEffect(() =>{
    if(!select.user){
      navigate('/login');
    }
  })

  if (select.user) {
    return (
      <PageLayout>
        <ProfileTools />
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <ProfileCard user={select.user} t={t} />
      </PageLayout>
    );
  }
}

export default memo(Profile);