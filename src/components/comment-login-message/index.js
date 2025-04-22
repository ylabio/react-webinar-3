import { memo } from 'react';
import { Link } from 'react-router-dom'
import './style.css';

function CommentLoginMessage(back) {
  return (
    <p className='Login-message'>
      <Link to='/login' className='Login-link' state={back}>
        Войдите
      </Link>, чтобы иметь возможность комментировать
    </p>
  );
}

export default memo(CommentLoginMessage);