import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import dateFormat from '../../utils/date-format';
import Reply from '../reply';

function Comment({comment, onReply, isReply, user, exists, onSignIn}) {
  const cn = bem('Comment');

  return (
    <div className={cn()} id={comment.id} style={{paddingLeft: comment.level < 10 ? (comment.level * 30) + 'px' : '300px'}}>
      <div className={cn('head')}>
        <span><b>{comment.author.profile.name}</b></span>
        <span className={'Comment_gray'}>{dateFormat(comment.dateCreate)}</span>
      </div>
      <div className={cn('text')}>
        {comment.text}
      </div>
      <div className={cn('reply')}>
        <button onClick={() => onReply(comment._id)}>Ответить</button>
      </div>
      {isReply &&
        <Reply commentId={{"_id": comment._id, "_type": "comment"}} user={user} exists={exists} onSignIn={onSignIn}
          onReply={onReply}/>}
    </div>
  );
}

export default memo(Comment);