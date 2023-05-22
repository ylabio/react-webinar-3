import React from "react";
import PropTypes from "prop-types";
import './style.css';
import List from "../list";
import Head from "../head";
import {formattedPrice} from "../../utils";

export function Modal({list, onDeleteItem, isOpen, closeModal, totalPrice}) {
  return (
    <div className={`Modal ${isOpen ? 'open-modal' : ''}`}>
      <div className="Modal-content">
        <Head title={'Корзина'}/>
        <button className="close-modal" onClick={closeModal}>
          Закрыть
        </button>
        <div className={'Wrap'}>
          <List list={list} listFunction={onDeleteItem} listTitle={'Удалить'}/>
          <div className="Modal-total">
            <strong>Итого</strong>
            <strong>{formattedPrice(totalPrice)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  total: PropTypes.number,
};


export default React.memo(Modal);
