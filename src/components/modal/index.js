import React, { useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import './style.css';

const rootElement = document.querySelector('#root');

function Modal ({ children, onModalClose}){

  const container = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    rootElement?.appendChild(container);
    return () => {
      rootElement?.removeChild(container)
    }
  })

  const onStopPropagation = (event) => {
    event.stopPropagation();
  }

  return createPortal(
    <div onClick={onModalClose} className={'Modal-background'}>
      <div onClick={onStopPropagation} className={'Modal'}>{children}</div>
    </div>
    , container);
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

Modal.defaultProps = {
  onModalClose: () => {},
}

export default React.memo(Modal);