import {memo} from 'react';
import './style.css';


function Comment({item, onSelect, Select, t, lang, user, inputForm}) {
  const comment = item


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
    startTime = new Date((startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 )));

  return (
    <div className='Comment-container'
         id={comment.status == 'empty' ? comment._id + 'a' : ('')}
         style={{margin:`0 0 30px ${20*(item.level< 10 ? item.level - 1 : 10)}px`}} >
          
    <div className='Comment-title'>
        <span style={item.author?._id == user ? {color:"#666666"} : {}}>{comment.author?.profile.name}</span>
        {lang == 'ru' ? (<span>{startTime.toLocaleString(lang, options).replace("г.","")}</span>) : (<span>{startTime.toLocaleString(lang, options)}</span>)}
        
        
    </div>
    <div className='Comment-text' >
        <a>{comment.text}</a>
    </div>
    <div className='Comment-action'>
    <span onClick={(_id) => {onSelect(comment._id)}}>{t("comments.reply")}</span>
    </div>
    </div>
  )
} else if (Select == comment._id && comment.status == 'empty') {

  return (<div className='Comment-container'  
  style={{margin:`0 0 30px ${20*(item.level< 10 ? item.level - 1 : 10)}px`}} >{inputForm('comment',comment._id)}</div>)
} else return (<div></div>)
}

export default memo(Comment);