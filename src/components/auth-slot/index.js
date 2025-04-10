import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import './style.css';

function AuthSlot() {
  const store = useStore();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const handleLogout = async () => {
    await store.actions.user.logout();
    navigate('/login');
  };

  const isLoadingProfile = user.token && !user.data;
  const isAuthorized = Boolean(user.token && user.data);
  const isUnauthorized = !user.token && !user.data;

  return (
    <div className="Container">
      <div className="AuthSlot">
        {isLoadingProfile && (
          <div className="AuthSlot-skeleton">
            <div className="skeleton-name" />
            <div className="skeleton-button" />
          </div>
        )}

        {isAuthorized && (
          <>
            <div className="Sign-in">
              <Link to="/profile">
                {(user.data.profile?.name || 'Профиль').replace(/№\s?/, '').trim()}
              </Link>
            </div>
            <button onClick={handleLogout}>Выход</button>
          </>
        )}

        {isUnauthorized && <Link to="/login">Вход</Link>}
      </div>
    </div>
  );
}

export default memo(AuthSlot);
