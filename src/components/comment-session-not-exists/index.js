import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentSessionNotExists({onSignIn, onCancel}) {

  const cn = bem('CommentSessionNotExists');

  return (
    <div className={cn()}>
      <button onClick={onSignIn} className={`${cn('btn')} ${cn('singInBtn')}` }>Войдите</button>
      <span>чтобы иметь возможность ответить.</span>
      <button onClick={onCancel} className={`${cn('btn')} ${cn('cancelBtn')}` }>Отмена</button>
    </div>
  );
}

CommentSessionNotExists.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};


export default memo(CommentSessionNotExists);
