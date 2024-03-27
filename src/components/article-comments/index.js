import {memo, useCallback, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import Comment from '../comment';
import CommentArea from '../comment-area';
import './style.css';

function ArticleComments(props) {
	const {comments, count, session, onOpenReply, onCloseReply, onAddComment, onAddReply, t, path, location} = props
  const cn = bem('ArticleComments');

	const [isShown, setIsShown] = useState(true);

	const callbacks = {
    openReply: useCallback((_id) => {
      setIsShown(false);
      onOpenReply(_id);
    }),
    closeReply: useCallback(() => {
      setIsShown(true);
      onCloseReply();
    }),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
				{t("comments.title")} ({count})
			</div>
			{comments.map((item) => (
        <Comment key={item._id} 
								 item={item}
								 session={session}
								 onOpenReply={callbacks.openReply}
								 onCloseReply={callbacks.closeReply}
								 onAddReply={onAddReply}	
								 path={path}
								 t={t}
								 location={location}/>
      ))}
			{isShown && <CommentArea session={session.exists} onAddComment={onAddComment} path={path} t={t} location={location}/>}
    </div>
  );
}

ArticleComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  count: PropTypes.number,
	session: PropTypes.shape({exists: PropTypes.bool}).isRequired,
	onOpenReply: PropTypes.func,
	onCloseReply: PropTypes.func,
	onAddComment: PropTypes.func,
	onAddReply: PropTypes.func,
	t: PropTypes.func,
	location: PropTypes.string,
};

export default memo(ArticleComments);