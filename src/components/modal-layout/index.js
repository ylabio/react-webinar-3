import './style.css';
import React from "react";
import PropTypes from "prop-types";

function ModalLayout({children}) {
  return (
    <div className={'modal'}>
      <div className={'modal-content'}>
        {children}
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  children: PropTypes.node
}

export default React.memo(ModalLayout)