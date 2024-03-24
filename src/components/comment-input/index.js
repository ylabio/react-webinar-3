import {memo, useState} from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';


function CommentInput({type, id, onComment, auth, t}) {
    const [Value, setValue] = useState();
    let Type
    const navigate = useNavigate()
    const clear = () => {
      var input = document.getElementById('input')
      input.value=''
    }
  if (auth){  
    if (type == "article"){
      Type = t("comments.newComment");
    } else Type = t("comments.newReply");
  return (
    <div className='CommentInput-container'>
        <label>{Type}</label>
        <input
            placeholder={t("comments.placeholder")}
            name="text" 
            onChange={(event) => setValue(event.target.value)}
            id="input"
        />
        <div className='CommentInput-btns'>
            <button onClick={() => {onComment(Value, id, type), clear() }}>{t("comments.send")}</button>
            {type == "comment" ? (<button onClick={() => {onComment(), clear() }} style={{width:"67px"}}>{t("comments.cancel")}</button>) : ('')}
        </div>
        
    </div>
  );
} else {
  if (type == "article"){
    Type = t("comments.commentMessage");
  } else Type = t("comments.replyMessage");
  return (
    <div className='CommentAuth' style={{margin:"10px"}}>
    <span><a onClick={()=> navigate("/login")}>{t("comments.replyLogin")},</a> {Type} </span>
    {type == "comment" ? (<span onClick={() => onComment()}>{t("comments.cancel")}</span>) : ('')}
    </div>
  );
}
}

export default memo(CommentInput);