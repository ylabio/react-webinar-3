import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Button(props) {

  return (
    <button className='Button' onClick={props.onClick}>
      {props.title}
    </button>
  );
}

Button.PropTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func
}

Button.defautlProps = {
  onClick: () => {
  },
}

export default React.memo(Button);
