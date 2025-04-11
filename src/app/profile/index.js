import Auth from '../../components/auth';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import UserInfo from '../../components/user-info';

function Profile() {
  const { t } = useTranslate();
  return (
    <>
      <Auth />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <UserInfo />
      </PageLayout>
    </>
  );
}

export default Profile;
