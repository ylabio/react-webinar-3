import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import ReplyArea from '../reply-area';
import './style.css';

function Comment({item, session, onOpenReply, onCloseReply, onAddReply, path, t, location}) {

  const cn = bem('Comment');
  return (
    <div className={cn()} style={item.level ? {paddingLeft: item.level < 10 ? item.level * 30 : 300} : {}}>
      <div className={cn('info')}>
        <div className={cn(item.author.profile.name === session?.user?.profile?.name ? 'current-user' : 'user')}>
					{item.author.profile.name}
				</div>
        <div className={cn('date')}>
          {item.dateCreate}
        </div>
      </div>
      <div className={cn('text')}>{item.text}</div>
      <span className={cn('reply')} onClick={() => onOpenReply(item._id)}>
        {t("comments.reply")}
      </span>
			{item.openReply && (
				<ReplyArea session={session.exists} 
									 onClose={onCloseReply} 
									 onAdd={(value) => onAddReply(value, item._id)} path={path} 
									 t={t} 
									 location={location}/>
			)}
    </div>
  );
}

Comment.propTypes = {
  item: PropTypes.shape({}),
  session: PropTypes.shape({exists: PropTypes.bool}).isRequired,
  path: PropTypes.string,
  onOpenReply: PropTypes.func,
  onCloseReply: PropTypes.func,
  onAddReply: PropTypes.func,
	t: PropTypes.func,
	location: PropTypes.string,
};

export default memo(Comment);

