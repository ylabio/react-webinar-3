import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


function Button({isAccent = false, onClick = () => {}, children}) {
  return (
      <button 
        className={isAccent ? 'Button-red' : 'Button'} 
        onClick={onClick}
      >
        {children}
      </button>  
  );
}

Button.propTypes = {
  isAccent: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};

export default React.memo(Button);
