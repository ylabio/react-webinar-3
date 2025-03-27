import React from 'react';
import './style.css';

const CustomButton = ({
  icon,
  variant = 'default',
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  const buttonClasses = `custom-button ${variant} ${disabled ? 'disabled' : ''} ${className}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="button-content">
        {icon && <span className="button-icon">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default CustomButton;