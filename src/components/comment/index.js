import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CommentsForm from '../comments-form';

function Comment({comment, isActive, onSubmit, onCancel}) {
  const cn = bem('Comment');
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <b className={cn('title-name')}>{comment.name}</b>
        <span className={cn('title-date')}>{comment.date}</span>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <div className={cn('controls')}>
        <span className={cn('controls-reply')}>{'Ответить'}</span>
      </div>
      {isActive && (
        <CommentsForm
          id={comment._id}
          isRoot={false}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
  }),
  isActive: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

Comment.defaultProps = {
  onSubmit: (e) => {
    e.preventDefault();
  },
  onCancel: (e) => {
    e.preventDefault();
  },
};

export default memo(Comment);
