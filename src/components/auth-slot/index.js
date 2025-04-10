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

  if (!user.token || !user.data) {
    return (
      <div className="Container">
        <div className="AuthSlot">
          <Link to="/login">Вход</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="Container">
      <div className="AuthSlot">
        <div className="Sign-in">
          <Link to="/profile">
            {(user.data.profile?.name || 'Профиль').replace(/№\s?/, '').trim()}
          </Link>
        </div>
        <button onClick={handleLogout}>Выход</button>
      </div>
    </div>
  );
}

export default memo(AuthSlot);
