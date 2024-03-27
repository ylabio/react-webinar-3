import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const CommentReminder = ({ parent, onSignIn, setReplierActive, tt }) => {
  const style = parent === 'comment' ? {
    padding: 0,
    margin: '25px 0',
  } : {}

  const cn = bem('CommentReminder')

  const onCancelClick = () => {
    setReplierActive('article')
  }

  return (
    <div style={style} id={parent === 'comment' ? 'replyTo' : ''} className={cn()}>
      <span className={cn('link')} onClick={onSignIn}>{tt('comments.signIn')}</span>{tt('comments.message')} {parent === 'article' ? tt('comments.messageComment') : tt('comments.messageReply')}.
      {' '}{parent === 'comment' && <span className={cn('cancel')} onClick={onCancelClick}>{tt('comments.cancel')}</span>}
    </div>
  );
};

CommentReminder.propTypes = {
  parent: PropTypes.string,
  onSignIn: PropTypes.func,
  setReplierActive: PropTypes.func
}

CommentReminder.defaultProps = {
  setReplierActive: () => {},
  onSignIn: () => {}
}

export default React.memo(CommentReminder);
