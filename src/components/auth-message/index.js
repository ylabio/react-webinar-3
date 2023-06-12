import './style.css';
import {cn as bem} from '@bem-react/classname';
import {memo} from "react";
import PropTypes from "prop-types";

function AuthMessage(props) {
  const cn = bem('AuthMessage');
  return (
    <div className={cn()}>
      <span onClick={props.onClick} className={cn('link')}>Войдите</span>, чтобы иметь возможность комментировать
    </div>
  )
}

AuthMessage.propTypes = {
  onClick: PropTypes.func
}

AuthMessage.defaultArgs = {
  onClick: () => {}
}

export default memo(AuthMessage);