import {memo, useCallback} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './style.css';
import PropTypes from 'prop-types';

function ArticleAuthMessage({ t = text => text }) {
  const navigate = useNavigate();
  const location = useLocation();



  const callbacks = {
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  }

  return (
    <div className="ArticleAuthMessage">
      <a className="ArticleAuthMessage-link" onClick={callbacks.onSignIn}>
        {t('auth.message-link')}
      </a>
      {t('auth.message-text')}
    </div>
  );
}

ArticleAuthMessage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default memo(ArticleAuthMessage);
