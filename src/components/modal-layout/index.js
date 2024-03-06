import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ModalLayout({children}){
    return(
        <div className="Modal-bg">
            <div className="Modal-body">
                {children}
            </div>
        </div>
    )
}

ModalLayout.propTypes = {
    children: PropTypes.node
  }

export default React.memo(ModalLayout)