import { memo } from 'react';
import { Link } from 'react-router-dom'
import './style.css';

function CommentLoginMessage() {
  return <p className='Login-message'><Link to='/login' className='Login-link'>Войдите</Link>, чтобы иметь возможность комментировать</p>
}

export default memo(CommentLoginMessage);