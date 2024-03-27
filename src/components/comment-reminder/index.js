import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const CommentReminder = ({ parent, login, setReplierActive }) => {
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
      <Link to={login}>Войдите</Link>, чтобы иметь возможность {parent === 'article' ? 'комментировать' : 'ответить'}.
      {' '}{parent === 'comment' && <span onClick={onCancelClick}>Отмена</span>}
    </div>
  );
};

CommentReminder.propTypes = {
  parent: PropTypes.string,
  login: PropTypes.string,
  setReplierActive: PropTypes.func
}

CommentReminder.defaultProps = {
  setReplierActive: () => {}
}

export default React.memo(CommentReminder);
