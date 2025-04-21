import { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import PropTypes from 'prop-types';

function PLeseLogin({ t = () => {} }) {
  return (
    <div className="PleaseLogin">
      <Link
        to={'/login'}
        state={{
          back: location.pathname + location.search,
        }}
      >
        {t('article.pleaseSignIn')}
        <span>{t('article.ableToComment')}</span>
      </Link>
    </div>
  );
}

PLeseLogin.propTypes = {
  t: PropTypes.func,
};
export default memo(PLeseLogin);
