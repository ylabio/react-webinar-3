import { memo, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import AuthField from '../../components/auth-field';
import useTranslate from '../../hooks/use-translate';
import { useNavigate } from 'react-router-dom';
import UserData from '../../components/user-data';
import useAuth from '../../hooks/use-auth';

function ProfilePage() {
  const store = useStore();
  const session = useSelector(state => state.session);
  const profile = useSelector(state => state.profile);

  const isAuthorized = useAuth('/login');

  const { t } = useTranslate();

  const navigate = useNavigate();
  const handleLogout = async () => {
    await store.actions.session.logout();
    navigate('/login');
  };

  useEffect(() => {
    if (isAuthorized && !profile.user) {
      store.actions.profile.loadCurrentUser(session.token);
    }
  }, [session.token, profile.user]);

  if (!profile.user) {
    return null;
  }

  const { email } = profile.user;
  const { name, phone } = profile.user.profile;

  return (
    <>
      <Head
        title={t('title')}
        authField={<AuthField user={profile.user} token={session.token} callback={handleLogout} />}
      >
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <UserData email={email} name={name} phone={phone} />
      </PageLayout>
    </>
  );
}

export default memo(ProfilePage);
