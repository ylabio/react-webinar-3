import useSelector from '../../hooks/use-selector';
import UserItems from '../../components/user-items';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';
import { memo, useCallback } from 'react';
import useTranslate from '../../hooks/use-translate';

function UserControls() {
  
  const navigate = useNavigate();

  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    authStatus: state.user.authStatus,
    userInfo: state.user.userInfo
  }));

  const callbacks = {
    login: () => navigate('/login'),
    logout: useCallback(() => store.actions.user.logout(), [store])
  }

  return (
    <UserItems 
      authStatus={select.authStatus}
      user={select.userInfo}
      onLogin={callbacks.login} 
      onLogout={callbacks.logout}
      t={t}
    />
  );
}

export default memo(UserControls);
