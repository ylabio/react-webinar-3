import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import formatDate from '../../utils/date-format';
import './style.css';

function Comment(props) {
  const cn = bem('Comment');

  const authorName = props.comment.author.profile.name;
  let isUserAuthor = false;

  if (props.user.profile) {
    const userName = props.user.profile.name;
    isUserAuthor = props.exists && (userName === authorName);
  };

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <div className={cn(isUserAuthor ? 'name-exists' : 'name')}>{authorName}</div>
        <div className={cn('date')}>{formatDate(props.comment.dateCreate, props.t)}</div>
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
