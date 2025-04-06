import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Button({ onClick = () => {}, title, style, type = 'button', disabled=false }) {
  const cn = bem('Button');

  return (
    <div className={cn()}>
      <button type={type} className={cn({ style })} onClick={(e) => onClick(e)} disabled={disabled}>
        {title}
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.oneOf(['text', 'primary', 'delete', 'outline', 'page', 'page-current']),
  type: PropTypes.oneOf(['button', 'submit']),
  disabled: PropTypes.bool,
};

export default memo(Button);
