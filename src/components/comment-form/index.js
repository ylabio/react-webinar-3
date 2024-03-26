import { memo, useState } from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

function CommentForm({id, onSendComment, onResetId, type}) {

  const [text, setText] = useState('');

  const cn = bem('CommentForm');

  const sendText = (id, text) => {
    onSendComment(id, text, type)
  }

  const resetId = () => {
    onResetId(null);
  }

  return (
    <div className={cn()}>
      <p className={cn('title')}>{`Новый ${!id ? 'комментарий' : 'ответ'}`}</p>
      <textarea className={cn('textarea')} name="textarea" value={text} onChange={(e) => setText(e.target.value)}></textarea>
      <div className={ cn( 'wrapper' ) }>
        <button className={ cn( 'send' ) } type={'button'} onClick={() => sendText(id, text)}>Отправить</button>
        { id ? <button className={ cn( 'cancel' ) } type={'button'} onClick={resetId}>Отмена</button> : null }
      </div>
    </div>)
}

CommentForm.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  onResetId: PropTypes.func,
  onSendComment: PropTypes.func,
};

export default memo( CommentForm);