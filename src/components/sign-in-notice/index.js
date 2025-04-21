import { memo } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

function SignInNotice({ pathname }) {
  return (
    <div className="SignInNotice">
      <Link className="SignInNotice-link" to={'/login'} state={{ back: pathname }}>
        Войдите
      </Link>
      , чтобы иметь возможность комментировать
    </div>
  );
}

export default memo(SignInNotice);
