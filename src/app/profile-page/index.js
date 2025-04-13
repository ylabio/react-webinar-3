import { memo } from 'react';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import PageTitle from '../../components/page-title';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import ProfileCard from '../../components/profile-card';

const ProfilePage = () => {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    name: state.user.user.profile.name,
    email: state.user.user.email,
    phone: state.user.user.profile.phone,
  }));

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <PageTitle title={t('profile.title')} />
        <ProfileCard
          profile={{ name: select.name, email: select.email, phone: select.phone }}
          fields={{ name: t('profile.name'), email: t('profile.email'), phone: t('profile.phone') }}
        />
      </PageLayout>
    </>
  );
};

export default memo(ProfilePage);
