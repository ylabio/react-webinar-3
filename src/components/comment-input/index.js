import { cn as bem } from '@bem-react/classname';
import './style.css';
import { memo } from 'react';

function CommentInput({onSend, onCancel, parent}){
  const cn = bem('CommentInput');

  return(
    <div className={cn()}>
      <div className={cn('head')}>
        Новый {parent == 'comment' ? 'ответ' : 'комментарий'}
      </div>
      <div className={cn('body')}>

      </div>
      <div className={cn('actions')}>

      </div>
    </div>
  );

}