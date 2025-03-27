import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Button({ variant, children, icon, ...props }) {
  const cn = bem('Button');
  return (
    <button className={cn({ variant: variant })} {...props}>
      <span className={cn('Icon')}>{icon}</span>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['solid', 'outline']),
  icon: PropTypes.node,
};

Button.defaultProps = {
  variant: 'solid',
};

export default Button;
