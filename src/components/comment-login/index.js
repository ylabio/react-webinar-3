import { memo } from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

function CommentLogin({id, onResetId, onSignIn}) {

  const cn = bem('CommentLogin');

  const resetId = () => {
    onResetId(null);
  }

  return (
    <div className={cn()}>
      <button className={cn('Link')} type={'button'} onClick={onSignIn}>Войдите</button>
      {`, чтобы иметь возможность ${!id ? 'комментировать' : 'ответить.'}`} { id ? <button onClick={resetId} className={cn('button')}>Отмена</button> : null }
    </div>)
}

CommentLogin.propTypes = {
  id: PropTypes.string,
  onResetId: PropTypes.func,
  onSignIn: PropTypes.func,
};

export default memo(CommentLogin);

