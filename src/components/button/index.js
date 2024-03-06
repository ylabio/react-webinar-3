import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Button({callback, title, additionalStyle}) {
  return (
    <button className='Button' style={additionalStyle} onClick={() => callback()}>{title}</button>
  )
}

Button.propTypes = {
	callback: PropTypes.func,
	title: PropTypes.string,
	additionalStyle: PropTypes.object
};

Button.defaultProps = {
	callback: () => {}
}

export default React.memo(Button);