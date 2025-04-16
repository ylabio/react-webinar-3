import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import './style.css';

function LoginButton() {
  const store = useStore();
  const { user, waiting } = useSelector(state => state.auth); // Добавляем waiting
  const { t } = useTranslate();
  const location = useLocation();

  return (
    <div className="LoginButton">
      <div className="LoginButton-container">
        {user ? (
          <>
            <Link to="/profile">{user.profile.name}</Link>
            <button
              onClick={() => store.actions.auth.signOut()}
              disabled={waiting} // Отключаем кнопку при выходе
            >
              {waiting ? t('loading') : t('head.exit')}
            </button>
          </>
        ) : (
          <Link to={`/login?from=${encodeURIComponent(location.pathname)}`}>
            {t('head.entry')}
          </Link>
        )}
      </div>
    </div>
  );
}
export default memo(LoginButton);
