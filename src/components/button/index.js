import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Button({ onClick = () => {}, title, style, type = 'button', className }) {
  const cn = bem('Button');

  return (
    <div className={`${cn()} ${className || ''}`}>
      <button type={type} className={cn({ style })} onClick={() => onClick()}>
        {title}
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.oneOf(['text', 'primary', 'delete', 'outline']),
  type: PropTypes.oneOf(['button', 'submit']),
  className: PropTypes.string,
};

export default memo(Button);
