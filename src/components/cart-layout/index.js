import React, { useRef } from "react";
import PropTypes from "prop-types";
import './style.css';

function CartLayout({showModal, children}) {
  const cartModal = useRef();

  if (cartModal.current) {
    if (!cartModal.current.open && showModal) cartModal.current.showModal();
    if (!showModal) cartModal.current.close();
  }

  return (
    <dialog ref={cartModal} className='CartLayout'>
        {children}
    </dialog>
  );
}

CartLayout.propTypes = {
  showModal: PropTypes.bool,
  children: PropTypes.node
}

export default React.memo(CartLayout);
