import {memo, useState} from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';


function CommentInput({type, id, onComment, auth}) {
    const [Value, setValue] = useState();
    const [Type, setType] = useState(type);
    const navigate = useNavigate()
    // Если CommentInput( auth == false ) --> менять компонент (ПРОВЕРКУ ДЕЛАТЬ НЕ ЗДЕСЬ)
    const clear = () => {
      var input = document.getElementById('input')
      input.value=''
    }
  if (auth){  
    switch (Type){
      case "комментарий":
        return setType("article");

      case "ответ":
        return setType("comment");  
    }
  return (
    <div className='CommentInput-container'>
        <label>Новый {type}</label>
        <input 
            placeholder='Текст'
            onChange={(event) => setValue(event.target.value)}
            id="input"
        />
        <div className='CommentInput-btns'>
            <button onClick={() => {onComment(Value, id, Type), clear() }}>Отправить</button>
            {type == 'ответ' ? (<button onClick={() => {onComment(), clear() }} style={{width:"67px"}}>Отмена</button>) : ('')}
        </div>
        
    </div>
  );
} else {
  switch (Type){
    case "комментарий":
      return setType("комментировать");

    case "ответ":
      return setType("ответить.");  
  }
  return (
    <div className='CommentAuth' style={{margin:"10px"}}>
    <span><a onClick={()=> navigate("/login")}>Войдите,</a> чтобы иметь возможность {Type} </span>
    {Type == 'ответить.' ? (<span onClick={() => onComment()}>Отмена</span>) : ('')}
    </div>
  );
}
}

export default memo(CommentInput);