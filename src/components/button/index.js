import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Button = ({ className, onClick, children, disabled = false }) => {
  const cn = bem('Button');
  return (
    <button className={cn({ custom: className })} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node
};

export default memo(Button);
