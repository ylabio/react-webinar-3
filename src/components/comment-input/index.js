import { cn as bem } from '@bem-react/classname';
import './style.css';
import { memo } from 'react';
import { Link } from 'react-router-dom';

function CommentInput({ onSend, onCancel, parent, redirect, isLoggedIn }) {
  const cn = bem('CommentInput');


  if (isLoggedIn) {
    return (
      <div className={cn()}>
        <div className={cn('head')}>
          Новый {parent == 'comment' ? 'ответ' : 'комментарий'}
        </div>
        <div className={cn('body')}>
          <textarea className={cn('body-input')} />
        </div>
        <div className={cn('actions')}>
          <button>Отправить</button>
          {parent == 'comment' && <button onClick={() => onCancel()}>Отмена</button>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('redirect')}>
      <Link to={redirect}>Войдите</Link>
      , чтобы иметь возможность ответить.
      {parent == 'comment' && <div className={cn('redirect-cancel')} onClick={() => onCancel()}> Отмена</div>}
    </div>
  );

}

export default memo(CommentInput);