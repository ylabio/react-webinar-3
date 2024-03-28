import {memo, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {useDispatch} from "react-redux";

function CommentForm({handleSubmit, id, onCloseForm, labelButton, waiting}) {
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
      <div className={cn('title')}>{labelButton}</div>
      <form className={cn('form')} onSubmit={handleFormSubmit}>
        <textarea
          className={cn('textarea')}
          value={textComment}
          onChange={(e) =>
            setTextComment(e.target.value)}
        ></textarea>
        <div className={cn('buttonWrapper')}>
          <button className={cn('button')}>Отправить</button>
          {!!onCloseForm && <button className={cn('button')} onClick={() => onCloseForm()}>Отмена</button>}
        </div>
      </form>
    </div>
  );
}

export default memo(CommentForm);