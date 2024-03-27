import {memo, useEffect, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {useDispatch} from "react-redux";

function CommentForm({handleSubmit, waiting}) {
  const cn = bem('CommentForm');

  const dispatch = useDispatch();

  const [detailsComment, setDetailsComment] = useState({
    text: '',
    dateCreated: null,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(detailsComment)

    handleSubmit(detailsComment);
    setDetailsComment({text: '', dateCreated: null});
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>Новый комментарий</div>
      <form className={cn('form')} onSubmit={handleFormSubmit}>
        <textarea
          className={cn('textarea')}
          value={detailsComment.text}
          onChange={(e) =>
            setDetailsComment({...detailsComment, text: e.target.value})}
        ></textarea>
        <button className={cn('button')}>Отправить</button>
      </form>
    </div>
  );
}

export default memo(CommentForm);