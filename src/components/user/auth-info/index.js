import { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import useStore from "../../../hooks/use-store";
import useSelector from "../../../hooks/use-selector";
import './style.css';

function AuthInfo() {
  const cn = bem('Auth-Info');
  const store = useStore();

  const username = useSelector(state => state.user.data?.profile?.name);

  const callbacks = {
    onLogout: () => {
      store.actions.user.logout();
    },
  }

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        {username ? (
          <>
            <Link to="/profile" className={cn('username')}>
              {username}
            </Link>
            <button onClick={callbacks.onLogout}>Выход</button>
          </>
        ) : (
          <Link to="/login">
            <button>Вход</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default memo(AuthInfo);
