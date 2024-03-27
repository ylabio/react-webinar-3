import {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import dateFormat from '../../utils/date-format';
import Reply from '../reply';

function Comment({commentId, comment, onReply, isReply, user, exists, onSignIn, t}) {

  useEffect(() => {
    isReply && document.getElementById('comment-form-' + comment._id).scrollIntoView();
  }, [isReply]);

  const cn = bem('Comment');

  return (
    <div className={cn()} id={'comment-' + comment._id} style={{paddingLeft: comment.level < 10 ? (comment.level * 30) + 'px' : '300px'}}>
      <div className={cn('head')}>
        <span className={comment.author._id === user._id ? 'Comment_gray' : ''}><b>{comment.author.profile.name}</b></span>
        <span className={'Comment_gray'}>{dateFormat(comment.dateCreate)}</span>
      </div>
      <div className={cn('text')}>
        {comment.text}
      </div>
      <div className={cn('reply')}>
        <button onClick={() => onReply(comment._id)}>{t("comments.reply")}</button>
      </div>
      {isReply &&
        (
          <div style={{marginLeft: comment._id === commentId._id ? '30px' : '0px'}} id={'comment-form-' + comment._id}>
            <Reply commentId={commentId} user={user} exists={exists} onSignIn={onSignIn}
              onReply={onReply} t={t}/>
          </div>
        )
      }
    </div>
  );
}

export default memo(Comment);