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

function ProfilePage() {
  const store = useStore();
  const user = useSelector(state => state.user);

  const { t } = useTranslate();

  const navigate = useNavigate();
  const handleLogout = async () => {
    await store.actions.user.logout();
    navigate('/');
  };

  useEffect(() => {
    if (!user.token) {
      navigate('/');
    } else if (!user.data) {
      store.actions.user.loadProfile();
    }
  }, [user.data, user.token]);

  if (!user.data || !user.data.profile) {
    return null;
  }

  const { email } = user.data;
  const { name, phone } = user.data.profile;

  return (
    <>
      <Head title={t('title')} authField={<AuthField user={user} callback={handleLogout} />}>
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
