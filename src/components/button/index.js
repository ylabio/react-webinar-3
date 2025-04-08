import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Button({ onClick = () => {}, title, style, type = 'button' }) {
  const cn = bem('Button');

  const handleClick = (e) => {
    e.stopPropagation(); 
    e.preventDefault(); 
    onClick(e); 
  };

  return (
    <div className={cn()}>
      <button type={type} className={cn({ style })} onClick={handleClick}>
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
};

export default memo(Button);
