import React, { useEffect, useRef, useState } from "react";
import Portal, { createContainer } from "../portal";
import PropTypes from 'prop-types';
import './style.css'

const MODAL_CONTAINER_ID = "modal-container-id";

const Modal = ({children}) => {
  const rootRef = useRef(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);


  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className="Modal" ref={rootRef} >
        <div className="Modal-content">
          {children}
        </div>     
      </div>
    </Portal>
  ) : null;
};

Modal.propTypes = {
  children: PropTypes.node.isRequired
}

export default Modal;
