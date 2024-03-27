import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import ReplyArea from '../reply-area';
import dateFormat from '../../utils/date-format';
import './style.css';

function Comment({item, session, onOpenReply, onCloseReply, onAddReply, path, t, location, level=0}) {

  const cn = bem('Comment');

  const marginLeft = level <= 10 ? `30px` : '0px'; 

	const nested = (item.children || []).map((item) => {
    return (
      <div key={item._id} style={{marginLeft}}>
        <Comment
          item={item}
          session={session}
          onOpenReply={onOpenReply}
          onCloseReply={onCloseReply}
          onAddReply={onAddReply}
          t={t}
          level={level + 1}
          path={path}
          location={location}
        />
      </div>
    );
  });

  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <div className={cn(item.author.profile.name === session?.user?.profile?.name ? 'current-user' : 'user')}>
					{item.author.profile.name}
				</div>
        <div className={cn('date')}>
          {dateFormat(item.dateCreate, t("comments.lang"))}
        </div>
      </div>
      <div className={cn('text')}>{item.text}</div>
      <span className={cn('reply')} onClick={() => onOpenReply(item._id)}>
        {t("comments.reply")}
      </span>
			{nested}
			{item.openReply && (
				<ReplyArea session={session.exists} 
									 onClose={onCloseReply} 
									 onAdd={(value) => onAddReply(value, item._id)}
									 path={path} 
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
	level: PropTypes.number,
};

export default memo(Comment);

