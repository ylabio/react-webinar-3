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
      <div className="AuthSlot">
        <Link to="/login">Вход</Link>
      </div>
    );
  }

  return (
    <div className="AuthSlot">
      <Link to="/profile">{user.data.profile?.name || 'Профиль'}</Link>
      <button onClick={handleLogout}>Выход</button>
    </div>
  );
}

export default memo(AuthSlot);
