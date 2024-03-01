import React from "react";
import PropTypes from 'prop-types';
import './style.css';


function Controls(props) {
  return (
    <div className='Controls'>
      <button onClick={props.callback}>{props.title}</button>
    </div>
  )
}

Controls.propTypes = {
  callback: PropTypes.func
};

Controls.defaultProps = {
  callback: () => {}
}

export default React.memo(Controls);
