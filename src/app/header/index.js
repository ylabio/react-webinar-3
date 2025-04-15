import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import HeaderView from '../../components/header-view';

function Header() {
  const store = useStore();
  const user = useSelector(state => state.user.user);

  const handleLogout = async () => {
    await store.actions.user.logout();
  };

  return <HeaderView user={user} onLogout={handleLogout} />;
}

export default memo(Header);
