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
    <div className="auth-bar">
      {select.token ? (
        <div className="auth-bar__logged-in">
          <Link to="/profile" className="auth-bar__profile-link">
            {displayName}
          </Link>
          <Button 
            title={t('auth.logout')}
            onClick={callbacks.logout}
            style="text"
          />
        </div>
      ) : (
        <Link to="/login" state={{ from: window.location.pathname }}>
          <Button title={t('auth.login')} style="text" />
        </Link>
      )}
    </div>
  );
}

export default memo(AuthBar);