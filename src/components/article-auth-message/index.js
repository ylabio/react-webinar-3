import { memo } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import PropTypes from 'prop-types';

function ArticleAuthMessage({ t = text => text }) {
  return (
    <div className="ArticleAuthMessage">
      <Link to="/login" className="ArticleAuthMessage-link">
        {t('auth.message-link')}
      </Link>
      {t('auth.message-text')}
    </div>
  );
}

ArticleAuthMessage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default memo(ArticleAuthMessage);
