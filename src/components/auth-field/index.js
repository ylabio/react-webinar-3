import { memo } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function AuthField({ user, token, callback }) {
  const isAuthorized = Boolean(token && user);
  console.log(user);

  return (
    <div className="Container">
      <div className="Auth-field">
        {isAuthorized && (
          <>
            <div className="Sign-in">
              <Link to="/profile">
                {(user?.profile?.name || 'Профиль').replace(/№\s?/, '').trim()}
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
