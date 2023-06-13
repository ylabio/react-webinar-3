import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import CommentsItem from '../comments-item';

function CommentsList(props) {
  const cn = bem('CommentsList');
  return (
    <div className={cn({ depth: props.item && props.item.depth > 6 })}>
      {props.list.map((item) => (
        <div key={item._id} className='CommentsList-item'>
          <CommentsItem {...props} item={item} />
          {props.commentReplyId === item._id && (
            <div className='CommentsList-form'>{props.replyForm}</div>
          )}
        </div>
      ))}
    </div>
  );
}

CommentsList.propTypes = {
  props: PropTypes.any,
};

CommentsList.defaultProps = {
  renderItem: (item) => {},
};

export default memo(CommentsList);
