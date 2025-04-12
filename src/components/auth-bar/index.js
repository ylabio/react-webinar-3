import { memo } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Button from '../button';
import './style.css';

function AuthBar() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    token: state.user.token,
    profile: state.user.profile
  }));

  const callbacks = {
    logout: () => store.actions.user.logout()
  };

  const displayName = select.profile?.profile?.name || 
                     select.profile?.email || 
                     t('auth.profile');

  return (
    <div className="authbar">
      <div className="authbar-container">
        {select.token ? (
          <div className="authbar-login">
            <Link to="/profile" className="authbar-link">
              {displayName}
            </Link>
            <Button 
              title={t('auth.logout')}
              onClick={callbacks.logout}
              style="text"
            />
          </div>
        ) : (
          <Link to="/login" state={{ from: window.location.pathname }} className="authbar-link">
            {t('auth.login')}
          </Link>
        )}
      </div>
    </div>
  );
}

export default memo(AuthBar);