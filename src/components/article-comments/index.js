import {memo, useCallback, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import Comment from '../comment';
import CommentArea from '../comment-area';
import './style.css';

function ArticleComments(props) {
	const {comments, count, session, onOpenReply, onCloseReply, onAddComment, onAddReply} = props
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
				Комментарии ({count})
			</div>
			{comments.map((item) => (
        <Comment key={item._id} 
								 item={item}
								 session={session}
								 onOpenReply={callbacks.openReply}
								 onCloseReply={callbacks.closeReply}
								 onAddReply={onAddReply}	
								 path="/login"/>
      ))}
			{isShown && <CommentArea session={session} onAddComment={onAddComment} path="/login"/>}
    </div>
  );
}

ArticleComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  count: PropTypes.number,
	session: PropTypes.bool,
	onOpenReply: PropTypes.func,
	onCloseReply: PropTypes.func,
	onAddComment: PropTypes.func,
	onAddReply: PropTypes.func,
};

export default memo(ArticleComments);