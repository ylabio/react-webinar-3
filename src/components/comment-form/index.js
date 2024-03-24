import {memo, useState} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";


function CommentForm({callback, title, showFormId, setShowFormId}) {
  const cn = bem('CommentForm');
  const [text, setText] = useState('');


  const onChangeHandler = (e) => setText(e.target.value);
  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (text) {
      callback(text);
      setText('');
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className={cn()}>
      <h4>{title}</h4>
      <textarea onChange={onChangeHandler} value={text}/>
      <div className={cn('button-block')}>
        <button type='submit'>Отправить</button>
        {showFormId && <button onClick={() => setShowFormId(null)} type='submit'>Отмена</button>}
      </div>
    </form>
  );
}

export default memo(CommentForm);
