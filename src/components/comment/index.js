import {memo} from 'react';
import './style.css';
import CommentInput from '../comment-input';


function Comment({item, onSelect, Select, onComment, auth, t, lang, user}) {
    console.log(item)
    if (item.author != undefined){
    let comment = item
    var startTime = new Date(comment.dateCreate);
    var options = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timezone: 'UTC',
      year: 'numeric'
    };
    var date = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    startTime =   new Date( (   startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 )));
    // style={{margin:"0 0 0 20px"}}
  return (
    <div className='Comment-container'style={{margin:`0 0 0 ${20*(item.level< 10 ? item.level - 1 : 10)}px`}} >
    <div className='Comment-title'>
        <span style={item.author._id == user ? {color:"#666666"} : {}}>{comment.author?.profile.name}</span>
        <span>{startTime.toLocaleDateString(lang, date).slice(0,-3)+startTime.toLocaleString(lang, options).slice(16)}</span>
        
    </div>
    <div className='Comment-text' >
        <a>{comment.text}</a>
    </div>
    <div className='Comment-action'>
    <span onClick={(id) => onSelect(comment._id)}>{t("comments.reply")}</span>
    </div>
    {Select == comment._id ? (<CommentInput type={'comment'} id={comment._id} onComment={onComment} auth={auth} t={t}/>) : ('')}
    </div>
  );
}
}

export default memo(Comment);