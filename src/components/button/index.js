import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Button({
  onClick,
  buttonText
}) {
  return (
    <button className='button' onClick={onClick}>{buttonText}</button>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  buttonText: '',
  onClick: () => { }
}

export default React.memo(Button);
