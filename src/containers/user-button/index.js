import { memo } from 'react';

import ButtonAuth from '../../components/button-auth';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import ButtonUser from '../../components/button-user';
import { formatProfileName } from '../../utils';

function UserButton() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.authentication.token,
    profileName: state.user.user?.profile?.name || '',
  }));

  const handleProfileClick = () => {
    if (select.token) {
      store.actions.user.fetchUserProfile();
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    store.actions.authentication.logout();
    navigate('/');
  };

  return (
    <>
      {select.token ? (
        <>
          <ButtonUser
            handleProfileClick={handleProfileClick}
            profileName={formatProfileName(select.profileName)}
          />
          <ButtonAuth onLogout={handleLogout} />
        </>
      ) : (
        <ButtonAuth />
      )}
    </>
  );
}

export default memo(UserButton);
