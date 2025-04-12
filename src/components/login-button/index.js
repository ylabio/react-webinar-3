import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import './style.css';

function LoginButton() {
  const store = useStore();
  const { user } = useSelector(state => state.auth);
  const { t } = useTranslate();

  return (
    <div className="LoginButton">
      {user ? (
        <>
          <Link to="/profile">{user.profile.name}</Link>
          <button onClick={() => store.actions.auth.signOut()}>
            {t('head.exit')}
          </button>
        </>
      ) : (
        <Link to="/login">{t('head.entry')}</Link>
      )}
    </div>
  );
}
export default memo(LoginButton);
