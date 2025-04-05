import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Button({ onClick = () => {}, title, style, type = 'button', disabled = false }) {
  const cn = bem('Button');

  return (
    <div className={cn()}>
      <button type={type} className={cn({ style })} onClick={() => onClick()} disabled={disabled}>
        {title}
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.oneOf([
    'text',
    'primary',
    'delete',
    'outline',
    'pagination',
    'pagination active',
    'pagination dots',
  ]),
  type: PropTypes.oneOf(['button', 'submit']),
  disabled: PropTypes.bool,
};

export default memo(Button);
