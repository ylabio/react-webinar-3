import {memo, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import CommentsForm from '../comments-form';
import LoginInvite from '../../components/login-invite';
import List from '../list';
import './style.css';

function Comment({self, ...props}) {
  const cn = bem('Comment');

  const isActive = props.activeId === props.comment._id;
  const render = useCallback(props.makeRender(props.level + 1));
  const handleActivate = (e) => {
    e.preventDefault();
    props.onActivate(props.comment._id);
  };

  const kids = useMemo(() => props.comment.children.map(props.mapper), [props.comment.children]);

  return (
    <div
      className={cn({root: !props.level, deepest: props.level > 10})}
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
      {isActive && !props.isSession && (
        <LoginInvite
          link={props.loginLink}
          isRoot={false}
          onCancel={props.onCancel}
          anchor={props.comment._id}
        />
      )}
      <List
        list={kids}
        renderItem={render}
        noBorder={true}
      />
      {isActive && props.isSession && (
        <CommentsForm
          id={props.comment._id}
          isRoot={false}
          onSubmit={props.onSubmit}
          onCancel={props.onCancel}
          error={props.error}
          autoFocus={true}
        />
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    authorName: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
  }),
  activeId: PropTypes.string.isRequired,
  isSession: PropTypes.bool.isRequired,
  loginLink: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onActivate: PropTypes.func,
  error: PropTypes.object,
  makeRender: PropTypes.func.isRequired,
  mapper: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
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
