import { memo } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function AuthField({ user, callback }) {
  const isAuthorized = Boolean(user.token && user.data);

  return (
    <div className="Container">
      <div className="Auth-field">
        {isAuthorized && (
          <>
            <div className="Sign-in">
              <Link to="/profile">
                {(user.data.profile?.name || 'Профиль').replace(/№\s?/, '').trim()}
              </Link>
            </div>
            <button onClick={callback}>Выход</button>
          </>
        )}

        {!isAuthorized && <Link to="/login">Вход</Link>}
      </div>
    </div>
  );
}

export default memo(AuthField);
