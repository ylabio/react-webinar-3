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

function Profile() {
  const select = useSelector(state => ({
    token: state.auth.token,
    email: state.auth.user.email,
    profileData: state.auth.user?.profile,
    waiting: state.auth.waiting,
  }));

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
            name={select.profileData?.name}
            phone={select.profileData?.phone}
            email={select.email}
            t={t}
          />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
