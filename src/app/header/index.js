import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import './style.css';

function Header() {
  const cn = bem('Header');
  const store = useStore();
  const user = useSelector(state => state.user.profile);

  const handleLogout = async () => {
    await store.actions.user.logout();
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        {!user ?
          <Link className={cn('log')} to={'/login'}>Вход</Link>
          :
          <div className={cn('user')}>
            <Link className={cn('user-name')} to={"/profile"}>{user.profile.name}</Link>
            <Link className={cn('log')} to={'/'} onClick={handleLogout}>Выход</Link>
          </div>}
      </div>
    </div>
  );
}

export default memo(Header);
