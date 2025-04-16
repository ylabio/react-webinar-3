import { memo } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function HeadTop({ username, token, signOut }) {
  return (
    <div className="HeadTop">
      <div className="HeadTop-container">
        {token ? (
          <>
            {username && (
              <Link to={'/profile'} className="HeadTop-link">
                {username}
              </Link>
            )}
            <button type="button" className="HeadTop-link_primary" onClick={signOut}>
              Выход
            </button>
          </>
        ) : (
          <Link to={'/login'} className="HeadTop-link_primary">
            Вход
          </Link>
        )}
      </div>
    </div>
  );
}

export default memo(HeadTop);
