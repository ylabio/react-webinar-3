import {forwardRef, memo, useState} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";


function CommentForm({callback, title, showFormId, setShowFormId}, ref) {
  const cn = bem('CommentForm');
  const [text, setText] = useState('');


  const onChangeHandler = (e) => setText(e.target.value);
  const onSubmitHandler = (e) => {
    e.preventDefault()
    const trimmedText = text.trim()
    if (trimmedText) {
      callback(trimmedText);
      setText('');
    }
  }


  return (
    <form ref={ref} onSubmit={onSubmitHandler} className={cn()}>
      <h4>{title}</h4>
      <textarea  autoFocus onChange={onChangeHandler} value={text}/>
      <div className={cn('button-block')}>
        <button type='submit'>Отправить</button>
        {showFormId && <button onClick={() => setShowFormId(null)} type='submit'>Отмена</button>}
      </div>
    </form>
  );
}

export default memo(forwardRef(CommentForm));
