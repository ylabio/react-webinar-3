import {cn as bem} from '@bem-react/classname';
import {memo} from 'react';
import PropTypes from 'prop-types';
import listToTree from '../../utils/list-to-tree';
import './style.css';

const CommentsList = ({comments, renderComment}) => {
  const cn = bem('CommentsList');

  const commentTree = comments.count ? listToTree(comments.items)[0].children : [];

  return (
    <div className={cn()}>
      <h2 className={cn('heading')}>Комментарии {`(${comments.count || 0})`}</h2>
        {comments.count ?
          <div className={cn('comments-container')}>
            {commentTree.map(comment => (
              <div key={comment._id}>
                {renderComment(comment)}
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
  renderComment: PropTypes.func,
};

export default memo(CommentsList);