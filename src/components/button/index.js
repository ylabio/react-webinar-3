import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

function Button({ onClick = () => {}, title, style, type = 'button', fontSize = 'medium' }) {
  const cn = bem('Button');

  return (
    <div className={cn()}>
      <button type={type} className={cn({ style, fontSize })} onClick={() => onClick()}>
        {title}
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.oneOf(['text', 'text-primary', 'primary', 'delete', 'outline']),
  type: PropTypes.oneOf(['button', 'submit']),
  fontSize: PropTypes.oneOf(['small', 'medium']),
};

export default memo(Button);
