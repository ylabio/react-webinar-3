import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import dateFormat from '../../utils/date-format'

function Comment({ comment, onAnswer = () => {}}) {
  
  const cn = bem('Comment');
  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <h3 className={cn('title')}>{comment.author}</h3>
        <time className={cn('date')} dateTime={comment.dateCreate}>{dateFormat(comment.dateCreate)}</time>
      </div>
      <div className={cn('text')}>
        <p>{comment.text}</p>
      </div>
      <button className={cn('action')} onClick={onAnswer}>Ответить</button>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.string,
  }),
  t: PropTypes.func,
  onAnswer: PropTypes.func,
};

export default memo(Comment);
