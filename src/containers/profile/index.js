import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import ProfileCard from '../../components/profile-card';

function Profile() {
  const select = useSelector(state => ({
    user: state.profile.profile,
    loading: state.auth.loading,
  }));
  if (select.loading) return <div>Loading...</div>;

  return (
    <ProfileCard
      name={select.user?.profile?.name || 'Не указано'}
      email={select.user?.email || 'Не указано'}
      phone={select.user?.profile?.phone || 'Не указано'}
    />
  );
}

export default memo(Profile);
