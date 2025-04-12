import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function Head({ title, children }) {
  const store = useStore();
  const { t } = useTranslate();
  
  const select = useSelector(state => ({
    user: state.user.data,
    token: state.user.token
  }));

  const callbacks = {
    signOut: useCallback(() => store.actions.user.signOut(), [store])
  };

  return (
    <div className="Head">
      <div className="Head-auth">
        <div className="Head-auth-container">
          {select.token ? (
            <>
              <Link to="/profile" className="Head-username">
                {select.user?.profile?.name || select.user?.login}
              </Link>
              <button onClick={callbacks.signOut} className="Head-login">
                {t('login.logout')}
              </button>
            </>
          ) : (
            <Link to="/login" className="Head-login">
              {t('login.login')}
            </Link>
          )}
        </div>
      </div>
      <div className="Head-container">
        <h1>{title || t('title')}</h1> {/* Используем title если есть, иначе "Магазин" */}
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
