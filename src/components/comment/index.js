import {memo, useState} from 'react';
import './style.css';
import CommentInput from '../comment-input';


function Comment({item, onSelect, Select, onComment, auth, t, lang, user, onSignIn, index}) {
  const comment = item
  const level = item.level
  const addComment = async (value, id, type) => {
    await onComment(value, id, type, level, index).then(result => result)


  }

   if (item.author != undefined) {

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
    startTime = new Date((startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 )));
    // style={{margin:"0 0 0 20px"}}

  return (
    <div className='Comment-container'
         id={comment.status == 'empty' ? comment._id + 'a' : ('')}
         style={{margin:`0 0 30px ${20*(item.level< 10 ? item.level - 1 : 10)}px`}} >
    <div className='Comment-title'>
        <span style={item.author?._id == user ? {color:"#666666"} : {}}>{comment.author?.profile.name}</span>
        {lang == 'ru' ? (<span>{startTime.toLocaleDateString(lang, date).slice(0,-3)+startTime.toLocaleString(lang, options).slice(16)}</span>) : (<span>{startTime.toLocaleString(lang, options)}</span>)}
        
        
    </div>
    <div className='Comment-text' >
        <a>{comment.text}</a>
    </div>
    <div className='Comment-action'>
    <span onClick={(_id) => {onSelect(comment._id)}}>{t("comments.reply")}</span>
    </div>
    {/* {Select == comment._id ? (<CommentInput type={'comment'} id={comment._id} onComment={onComment} auth={auth} t={t} onSignIn={onSignIn}/>) : ('')} */}
    </div>
  )
} else if (Select == comment._id && comment.status == 'empty') {

  return (<div className='Comment-container'  
  style={{margin:`0 0 30px ${20*(item.level< 10 ? item.level - 1 : 10)}px`}} ><CommentInput type={'comment'} id={comment._id} onComment={addComment} auth={auth} t={t} onSignIn={onSignIn}/></div>)
} else return (<div></div>)
}

export default memo(Comment);