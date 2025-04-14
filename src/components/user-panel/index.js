import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import './style.css';

function UserPanel() {
  const store = useStore();
  const navigate = useNavigate();
  const { token, user } = useSelector(s => s.auth);

  const onLogout = () => {
    store.actions.auth.logout();
    navigate('/');
  };

  return (
    <div className="bar">
      {token && user && user.profile ? (
        <>
          <Link to="/profile" style={{ marginRight: '1rem' }}>
            {user.profile.name || 'Пользователь'}
          </Link>
          <button className="logout-btn" onClick={onLogout}>
            Выход
          </button>
        </>
      ) : (
        <Link className="login-link" to="/login">
          Вход
        </Link>
      )}
    </div>
  );
}

export default UserPanel;
