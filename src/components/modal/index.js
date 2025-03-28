import React from 'react';
import List from '../list/index.js';
import Close from '../../assets/close.svg';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ list, onAction = () => {}, title, isOpenModal, onCloseModal = () => {}, item }) {
  return isOpenModal ? (
    <div className="Modal">
      <div className="Modal-content">
        <div className="Modal-content-head">
          <h1>Корзина</h1>
          <button onClick={() => onCloseModal()}>
            <img src={Close}></img>
          </button>
        </div>
        <List list={list} onAction={onAction} title={title} />
        {list.length !== 0 ? (
          <div className="Modal-content-wrap">
            <div className="Modal-content-wrap-total">Итого:</div>{' '}
            <div className="Modal-content-wrap-cash">{`${item.cash.toLocaleString('ru-RU')} ₽`}</div>{' '}
          </div>
        ) : (
          <div>Корзина пуста</div>
        )}
      </div>
    </div>
  ) : null;
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      isOpenModal: PropTypes.bool,
    }),
  ).isRequired,
  onCloseModal: PropTypes.func,
  onAction: PropTypes.func,
  // onSelectItem: PropTypes.func,
};

export default React.memo(Modal);
