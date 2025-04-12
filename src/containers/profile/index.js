import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import ProfileCard from '../../components/profile-card';
import HeadContainer from '../head-container';
import AuthButton from '../auth-button';

function Profile() {
  const { t } = useTranslate();
  const user = useSelector(state => state.session.user);

  return (
    <>
      <AuthButton/>
      <HeadContainer/>
      <PageLayout>
        <Navigation />
        <ProfileCard
          name={user?.profile?.name}
          phone={user?.profile?.phone}
          email={user?.email}
          t={t}
        />
      </PageLayout>
    </>
  );
}

export default memo(Profile);