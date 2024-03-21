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
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";


function Profile() {
  const store = useStore();

  useInit(() => {
    store.actions.profile.setUser();
  }, []);

  const navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    token: state.session.token,
    user: state.profile.data,
    profileWaiting: state.profile.waiting,
    sessionWaiting: state.session.waiting
  }));

  if (!select.token && !select.sessionWaiting && !select.profileWaiting) {
    navigate('/login');
  }

  return (
    <PageLayout>
      <ProfileTools />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.profileWaiting}>
        <ProfileCard user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);