import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import ProfileDetails from '../../components/profile-details';
import TopBar from '../../containers/top-bar';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

function Profile() {
  const store = useStore();

  const select = useSelector(state => ({
    token: state.auth.token,
    profileData: state.profile.data,
    waiting: state.profile.waiting,
  }));

  useInit(() => {
    store.actions.profile.getProfile();
  });

  const { t } = useTranslate();

  return (
    <>
      <TopBar />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <ProfileDetails
            name={select.profileData.profile?.name}
            phone={select.profileData.profile?.phone}
            email={select.profileData.email}
            t={t}
          />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
