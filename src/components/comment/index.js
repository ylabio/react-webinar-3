import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Comment(props) {
  const cn = bem('Comment');
  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <div className={cn('name')}>{props.comment.author.profile.name}</div>
        <div className={cn('date')}>{props.comment.dateCreate}</div>
      </div>
      <div className={cn('text')}>{props.comment.text}</div>
    </div>
  );
}

Comment.propTypes = {
  t: PropTypes.func
};

Comment.defaultProps = {
  t: (text) => text
}

export default memo(Comment);
