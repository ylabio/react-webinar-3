import { memo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import LoginButton from '../login-button';
import './style.css';

function Head({ title, children }) {
  const store = useStore();
  const location = useLocation();
  const { t } = useTranslate();
  const { user, waiting } = useSelector(state => state.auth);

  // Формируем путь для входа с редиректом
  const loginPath = `/login?from=${encodeURIComponent(location.pathname)}`;

  // Обработчик выхода
  const handleLogout = () => {
    store.actions.auth.signOut();
  };

  return (
    <div className="Head">
      <LoginButton
        isAuth={!!user}
        userName={user?.profile?.name}
        isLoading={waiting}
        loginPath={loginPath}
        onLogout={handleLogout}
        t={t}
      />
      <div className="Head-container">
        <h1>{title}</h1>
        <div className="Head-place">{children}</div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
