import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentLogin({ location }) {
  const cn = bem('CommentLogin');

  return (
    <div className={cn()}>
      <Link to="/login" state={{ back: location.pathname }} className={cn('link')}>
        Войдите
      </Link>
      , чтобы иметь возможность комментировать.
    </div>
  );
}

CommentLogin.propTypes = {
  location: PropTypes.object,
};

export default CommentLogin;
