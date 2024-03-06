import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ModalOverlay({onClick}) {
  
  return (
    <div className={'ModalOverlay'} onClick={onClick}>
    </div>
  )
}

ModalOverlay.propTypes = {
  // onClick: PropTypes.func
};

ModalOverlay.defaultProps = {
  // onClick: () => {}
}

export default React.memo(ModalOverlay);
