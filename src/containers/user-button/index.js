import { memo } from 'react';

import ButtonAuth from '../../components/button-auth';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import ButtonUser from '../../components/button-user';

function UserPanel() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.user.token,
    profileName: state.user.result?.profile?.name || '',
  }));

  const handleProfileClick = () => {
    if (select.token) {
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    store.actions.user.logout();
    navigate('/');
  };

  return (
    <>
      {select.token ? (
        <>
          <ButtonUser handleProfileClick={handleProfileClick} profileName={select.profileName} />
          <ButtonAuth onLogout={handleLogout} />
        </>
      ) : (
        <ButtonAuth />
      )}
    </>
  );
}

export default memo(UserPanel);
