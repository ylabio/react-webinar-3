import {cn as bem} from '@bem-react/classname';
import {memo} from 'react';
import Comment from '../comment'
import PropTypes from 'prop-types';
import listToTree from '../../utils/list-to-tree';
import './style.css';

const CommentsList = ({
  comments,
  selectedComment,
  selectComment,
  unselectComment,
  replyToComment,
  isLoggedIn,
  noAuthNavigate,
}) => {
  const cn = bem('CommentsList');

  const commentTree = comments.count ? listToTree(comments.items)[0].children : [];

  return (
    <div className={cn()}>
      <h2 className={cn('heading')}>Комментарии {`(${comments.count || 0})`}</h2>
        {comments.count ?
          <div className={cn('comments-container')}>
            {commentTree.map(comment => (
              <div key={comment._id}>
                <Comment
                  commentData={comment}
                  commentToReplyId={selectedComment}
                  handleOpenReply={selectComment}
                  unselectComment={unselectComment}
                  replyToComment={replyToComment}
                  isLoggedIn={isLoggedIn}
                  noAuthNavigate={noAuthNavigate}
                />
              </div>
            ))}
        </div> : ''}
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.shape({
    count: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  selectedComment: PropTypes.string,
  selectComment: PropTypes.func.isRequired,
  unselectComment: PropTypes.func.isRequired,
  replyToComment: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  noAuthNavigate: PropTypes.func.isRequired,
};

export default memo(CommentsList);