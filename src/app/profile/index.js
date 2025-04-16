import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import HeadTop from '../../components/head-top';
import ProfileCard from '../../components/profile-card';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useAuth from '../../hooks/use-auth';
import useSelector from '../../hooks/use-selector';

function Profile() {
  const { t } = useTranslate();

  const store = useStore();
  const { isAuth, token, signOut } = useAuth();

  const select = useSelector(state => ({
    user: state.profile.user,
  }));

  useInit(() => {
    store.actions.profile.loadProfile(token);
  }, [isAuth, token]);

  return (
    <>
      <HeadTop username={select.user?.username} token={token} signOut={signOut} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileCard user={select.user} />
      </PageLayout>
    </>
  );
}

export default memo(Profile);
