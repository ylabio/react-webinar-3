import { memo, useCallback } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Button from '../button';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

function HeadTop() {
  const store = useStore();

  const select = useSelector(state => ({
    token: state.auth.token,
    user: state.auth.user,
  }));

  const callbacks = {
    // Выход
    signOut: useCallback(() => store.actions.auth.signOut(), [store]),
  };

  return (
    <div className="HeadTop">
      <div className="HeadTop-container">
        {select.token ? (
          <>
            {select.user?.profile?.name && (
              <Link to={'/profile'} className="HeadTop-link">
                {select.user.profile.name}
              </Link>
            )}
            <Button to={'/'} style="text" onClick={callbacks.signOut} title="Выход" />
          </>
        ) : (
          <Link to={'/login'} className="HeadTop-link_primary">
            Вход
          </Link>
        )}
      </div>
    </div>
  );
}

export default memo(HeadTop);
