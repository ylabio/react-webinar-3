import React from 'react';
import './style.css';
import close from 'src/Cancel.svg';
import List from '../list';
import PropTypes from 'prop-types';


function Modal({ list, closeModal = () => {}, onAction }) {
  return (
    <div className="Modal">
      <div className="Modal-content">
        <button
          className="Modal-button"
          onClick={() => {
            closeModal(false);
          }}
        >
          <img src={close} />
        </button>
        <h1>Корзина</h1>
        <List
          list={list}
          onAction={onAction}
          style="delete"
          isShowTotal={true}
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      amount: PropTypes.number,
      price: PropTypes.number,
    }),
  ).isRequired,
  closeModal: PropTypes.func,
  onAction: PropTypes.func,
};

export default Modal;
