import {memo, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";
import Spinner from "../spinner";

function CommentForm({onSubmit, title, onCancel, isShowCancelBtn, isWaiting}) {

  const cn = bem('CommentForm');

  const [commentText, setCommentText] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(commentText);
  }


  return (
    <Spinner active={isWaiting}>
      <form className={cn()} onSubmit={onFormSubmit}>
        <div className={cn('title')}>{title}</div>
        <textarea className={cn('text')} value={commentText} onChange={(e) => {
          setCommentText(e.target.value)
        }}/>
        <div className={cn('buttons')}>
          <button type="submit">Отправить</button>
          {isShowCancelBtn && <button type="button" onClick={onCancel}>Отмена</button>}
        </div>
      </form>
    </Spinner>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isShowCancelBtn: PropTypes.bool.isRequired,
  isWaiting: PropTypes.bool.isRequired
};


export default memo(CommentForm);
