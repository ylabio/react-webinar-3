import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Button({ variant = 'solid', color = 'primary', children, icon, ...props }) {
  const cn = bem('Button');
  return (
    <button className={cn({ variant, color })} {...props}>
      {icon && <span className={cn('Icon')}>{icon}</span>}
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['solid', 'outline']),
  color: PropTypes.oneOf(['primary', 'delete']),
  icon: PropTypes.node,
};

export default Button;
