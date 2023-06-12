import './style.css';
import {cn as bem} from '@bem-react/classname';
import {memo} from "react";
import PropTypes from "prop-types";

function AuthReplyMessage(props) {
  const cn = bem('AuthReplyMessage');
  return (
    <div className={cn()}>
      <span onClick={props.onClick} className={cn('link')}>Войдите</span>, чтобы иметь возможность ответить.
      <button onClick={props.onClose} className={cn('back')}>Отмена</button>
    </div>
  )
}

AuthReplyMessage.propTypes = {
  onClose: PropTypes.func,
  onClick: PropTypes.func
}

AuthReplyMessage.defaultArgs = {
  onClose: () => {},
  onClick: () => {}
}

export default memo(AuthReplyMessage);