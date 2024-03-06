import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onButton,name}) {
  return (
    <div className='Controls'>
      <button onClick={(e) => onButton(e)}>{name}</button>
    </div>
  )
}

Controls.propTypes = {
  onButton: PropTypes.func,
  name:PropTypes.string
};

Controls.defaultProps = {
  onButton: () => {}
}

export default React.memo(Controls);
