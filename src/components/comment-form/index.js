import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CommentForm() {
  const cn = bem('CommentForm');

  return (
    <div className={cn()}>
      <div className={cn('title')}>Новый комментарий</div>
      <form className={cn('form')}>
        <textarea className={cn('textarea')}></textarea>
        <button className={cn('button')}>Отправить</button>
      </form>
    </div>
  );
}

export default memo(CommentForm);