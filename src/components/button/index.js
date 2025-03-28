import React from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Button({ type = 'button', children, onClick, variant = 'solid', label }) {
  const cn = bem('Button');

  return (
    <button className={cn(variant)} type={type} onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  label: PropTypes.string,
};

export default React.memo(Button);
