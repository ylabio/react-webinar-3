import React from 'react';
import './style.css'
import PropTypes from "prop-types";

const Buttons = ({ children = {}, variant = 'default', ...props}) => {
  let cl = 'Default-button';

  if (variant === 'delete') {
    cl = 'Delete-button';
  }

  return (
    <button className={cl} {...props}>{children}</button>
  );
};

Buttons.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  props: PropTypes.array,
}

export default React.memo(Buttons);
