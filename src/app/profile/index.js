import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import ProfileInfo from '../../components/profile-info';

function Profile() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    profile: state.user.profile
  }));

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileInfo profile={select.profile} t={t} />
      </PageLayout>
    </>
  );
}

export default memo(Profile);