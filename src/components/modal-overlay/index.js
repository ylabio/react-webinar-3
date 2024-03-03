import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ModalOverlay(props) {
  
  return (
    <div className={'ModalOverlay'} onClick={props.onClick}>
    </div>
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func
};

ModalOverlay.defaultProps = {
  onClick: () => {}
}

export default React.memo(ModalOverlay);
