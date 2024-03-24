import {memo, useState} from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';


function CommentInput({type, id, onComment, auth}) {
    const [Value, setValue] = useState();
    let Type
    const navigate = useNavigate()
    const clear = () => {
      var input = document.getElementById('input')
      input.value=''
    }
  if (auth){  
    if (type == "article"){
      Type = "комментарий";
    } else Type = "ответ";
  return (
    <div className='CommentInput-container'>
        <label>Новый {Type}</label>
        <input 
            placeholder='Текст'
            onChange={(event) => setValue(event.target.value)}
            id="input"
        />
        <div className='CommentInput-btns'>
            <button onClick={() => {onComment(Value, id, type), clear() }}>Отправить</button>
            {type == "comment" ? (<button onClick={() => {onComment(), clear() }} style={{width:"67px"}}>Отмена</button>) : ('')}
        </div>
        
    </div>
  );
} else {
  if (type == "article"){
    Type = "комментировать";
  } else Type = "ответить.";
  return (
    <div className='CommentAuth' style={{margin:"10px"}}>
    <span><a onClick={()=> navigate("/login")}>Войдите,</a> чтобы иметь возможность {Type} </span>
    {type == "comment" ? (<span onClick={() => onComment()}>Отмена</span>) : ('')}
    </div>
  );
}
}

export default memo(CommentInput);