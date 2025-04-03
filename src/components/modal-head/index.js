import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalHead({ title, closeModal = () => {} }) {
  return (
    <div className={'Modal-head'}>
      <h1>{title}</h1>
      <button onClick={closeModal} className={'Modal-close'}></button>
    </div>
  );
}

ModalHead.propTypes = {
  title: PropTypes.node,
  closeModal: PropTypes.func,
};

export default React.memo(ModalHead);
