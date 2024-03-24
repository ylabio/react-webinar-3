import {memo} from 'react';
import './style.css';
import CommentInput from '../comment-input';


function Comment({item, onSelect, Select, onComment, auth}) {
    // console.log(item)
    if (item.author != undefined){
    let comment = item
    var startTime = new Date(comment.dateCreate);
    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timezone: 'UTC'
      };
    startTime =   new Date( (   startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 )));
    // style={{margin:"0 0 0 20px"}}
  return (
    <div className='Comment-container'style={{margin:`0 0 0 ${20*(item.level - 1)}px`}} >
    <div className='Comment-title'>
        <span>{comment.author?.profile.name}</span>
        <span>{startTime.toLocaleString("ru", options)}</span>
    </div>
    <div className='Comment-text' >
        <a>{comment.text}</a>
    </div>
    <div className='Comment-action'>
    <span onClick={(id) => onSelect(comment._id)}>Ответить</span>
    </div>
    {Select == comment._id ? (<CommentInput type={'comment'} id={comment._id} onComment={onComment} auth={auth}/>) : ('')}
    </div>
  );
}
}

export default memo(Comment);