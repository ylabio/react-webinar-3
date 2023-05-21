import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartModal from '../cart-modal';

function ModalLayout({children}) {
  return <div className="modal-layout">{children}</div>;
}

ModalLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(ModalLayout);
