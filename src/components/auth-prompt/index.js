import { Link } from 'react-router-dom';
import Button from '../button';
import './style.css';
import PropTypes from 'prop-types';

function AuthPrompt({ onLoginRedirect, t }) {
  return (
    <div className="auth-prompt">
      <Link to="/login" state={{ back: onLoginRedirect }} style={{ textDecoration: 'none' }}>
        <Button title={t('comments.signInToComment')} style="textRevers" />
      </Link>
      <span className="auth-prompt-text">{t('comments.toComment')}</span>
    </div>
  );
}

AuthPrompt.propTypes = {
    onLoginRedirect: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  export default AuthPrompt;