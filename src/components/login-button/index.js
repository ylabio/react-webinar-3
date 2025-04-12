import { memo } from 'react';
import { Link } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Button from '../button';
import './style.css';

function LoginButton() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    token: state.login.token,
    user: state.login.user,
  }));

  const callbacks = {
    logout: () => store.actions.login.logout(),
  };

  return (
    <div className="LoginButton">
      <div>
        {select.token && select.user ? (
          <div className="LoginButton-profile">
            <Link to="/profile" title={t('navigation.profile')}>
              {select.user.profile.name || t('navigation.profile')}
            </Link>
            <Button style="text" onClick={callbacks.logout} title={t('navigation.logout')} />
          </div>
        ) : (
          <Link to="/login">
            <Button style="text" title={t('navigation.login')} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default memo(LoginButton);
