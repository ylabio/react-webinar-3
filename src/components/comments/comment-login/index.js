import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentLogin() {
  const cn = bem('CommentLogin');
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={cn()}>
      <button
        className={cn('link')}
        onClick={() => {
          navigate('/login', { state: { back: location.pathname } });
        }}
      >
        Войдите
      </button>
      <span>, чтобы иметь возможность комментировать</span>
    </div>
  );
  1;
}

export default memo(CommentLogin);
