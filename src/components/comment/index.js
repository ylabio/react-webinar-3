import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import CommentsForm from '../comments-form';
import LoginInvite from '../../components/login-invite';
import './style.css';

function Comment({self, ...props}) {
  const isActive = props.activeId === props.comment._id;

  const cn = bem('Comment');

  const handleActivate = (e) => {
    e.preventDefault();
    props.onActivate(props.comment._id);
  };

  const footer = props.isSession ? (
    <CommentsForm
      id={props.comment._id}
      isRoot={false}
      onSubmit={props.onSubmit}
      onCancel={props.onCancel}
      error={props.error}
    />
  ) : (
    <LoginInvite
      link={props.loginLink}
      isRoot={false}
      onCancel={props.onCancel}
    />
  );

  return (
    <div
      className={cn()}
      style={props.style}
    >
      <div className={cn('title')}>
        <b className={cn('title-name', {self})}>{props.comment.authorName}</b>
        <span className={cn('title-date')}>{props.comment.date}</span>
      </div>
      <p className={cn('text')}>{props.comment.text}</p>
      <div className={cn('controls')}>
        <a
          className={cn('controls-reply')}
          onClick={handleActivate}
          href=''
          role='button'
        >
          {'Ответить'}
        </a>
      </div>
      {isActive && footer}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    authorName: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
  }),
  isActive: PropTypes.bool,
  isSession: PropTypes.bool,
  loginLink: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onActivate: PropTypes.func,
  error: PropTypes.object,
};

Comment.defaultProps = {
  onSubmit: (e) => {
    e.preventDefault();
  },
  onCancel: (e) => {
    e.preventDefault();
  },
  onActivate: () => {},
};

export default memo(Comment);
