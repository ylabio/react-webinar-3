import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import {Link} from 'react-router-dom';
import formatDate from '../../utils/date-format';
import NewComment from '../new-comment';

function Comment({comment}) {
  const cn = bem('Comment');
  const [isReplying, setIsReplying] = useState(false); 

  const toggleReply = () => {
    setIsReplying(prevState => !prevState); 
  };
  const paddingLeft = comment.level ? `${30 * (comment.level-1)}px` : '0';
  return (
    <div className={cn()} style={{paddingLeft}}>
      <div className={cn('top')}>
        {/* {props.username} */}
        <b className={cn('username')}>{comment.author.profile.name}</b>
        <span className={cn('date')}>{formatDate(comment.dateCreate)}</span>
      </div>
      <div className={cn('text')}>
        {comment.text}
      </div>
      <button className={cn('reply')} onClick={toggleReply}>Ответить</button>
      {isReplying && ( 
        // <div className={cn('replyField')}>
        //   <textarea className={cn('replyInput')}></textarea>
        //   <button className={cn('sendReply')} onClick={() => {}}>Отправить</button>
        // </div>
        <NewComment />
      )}
    </div>
  );
}


export default memo(Comment);
