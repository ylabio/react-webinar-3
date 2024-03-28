import {memo, useEffect, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {useDispatch} from "react-redux";

function CommentForm({handleSubmit, id, onCloseForm, waiting}) {
  const cn = bem('CommentForm');

  const dispatch = useDispatch();

  const [textComment, setTextComment] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(textComment)

    handleSubmit(textComment, id);
    setTextComment('');
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>Новый комментарий</div>
      <form className={cn('form')} onSubmit={handleFormSubmit}>
        <textarea
          className={cn('textarea')}
          value={textComment}
          onChange={(e) =>
            setTextComment(e.target.value)}
        ></textarea>
        <button className={cn('button')}>Отправить</button>
      </form>
    </div>
  );
}

export default memo(CommentForm);