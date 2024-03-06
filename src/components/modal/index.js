import React from "react";
import PropTypes from 'prop-types';
import "./style.css";

function ModalApp({showModal,children}) {

 const Modal = ({ show }) => {
    return (
      <>
       <div
          className={`modalContainer ${show ? "show" : ""} `}
        >
            <div className='backdrop' />
            <div className={`modal ${show ? "active" : ""} `} >
              {children}
            </div>
        </div>
      </>
    );
  };

  return (
    <Modal show={showModal} />
  );
}

ModalApp.propTypes = {
  showModal: PropTypes.bool,
  children: PropTypes.node
};

ModalApp.defaultProps = {
}

export default React.memo(ModalApp);