import { memo } from 'react';
import { Link } from 'react-router-dom';

function CommentsLink() {
  return (
    <div>
      <Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать
    </div>
  );
}

export default memo(CommentsLink);
