import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ children,...props}) {
  return (
    <div className="Controls" {...props}>
     {children}
    </div>
  );
}

Controls.propTypes = {
 children:PropTypes.node
};



export default Controls;
