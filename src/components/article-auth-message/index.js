import { memo } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function ArticleAuthMessage() {
  return (
    <div className="ArticleAuthMessage">
      <Link to="/login" className="ArticleAuthMessage-link">Войдите</Link>, чтобы иметь возможность комментировать
    </div>
  );
}

export default memo(ArticleAuthMessage);
