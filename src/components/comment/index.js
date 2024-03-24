import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import ReplyArea from '../reply-area';
import './style.css';

function Comment({item, session, onOpenReply, onCloseReply, onAddReply, path}) {

  const cn = bem('Comment');
  return (
    <div className={cn()} style={{paddingLeft: `${item.level && 30 * item.level}px`}}>
      <div className={cn('info')}>
        <div className={cn('user')}>{item.author.profile.name}</div>
        <div className={cn('date')}>
          {item.dateCreate}
        </div>
      </div>
      <div className={cn('text')}>{item.text}</div>
      <span className={cn('reply')} onClick={() => onOpenReply(item._id)}>
        Ответить
      </span>
			{item.openReply && (
				<ReplyArea session={session} onClose={onCloseReply} onAdd={(value) => onAddReply(value, item._id)} path={path}/>
			)}
    </div>
  );
}

Comment.propTypes = {
  item: PropTypes.shape({}),
  session: PropTypes.bool,
  path: PropTypes.string,
  onOpenReply: PropTypes.func,
  onCloseReply: PropTypes.func,
  onAddReply: PropTypes.func,
};

export default memo(Comment);

