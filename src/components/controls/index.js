import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Modal from "../modal";

function Controls({ store, openModal, setOpenModal, list, onAddItem, onDeleteItem }) {
  const { basketList } = store.getState();
  const empty = 'пусто';

  const renderSumBasket = () => {
    let sumItems = 0;
    let sumPrice = 0;
    const uniqueItems = new Set(basketList);

    uniqueItems.forEach(item => sumItems += 1);
    basketList.forEach(item => sumPrice += item.price);

    return `${sumItems} / ${sumPrice} ₽`;
  };

  const renderInfo = () => {
    return `В корзине: ${basketList.length === 0 ? empty : renderSumBasket()}`;
  };

  return (
    <>
      <div className='Controls'>
        <div className='Info'>
          {renderInfo()}
        </div>
        <button onClick={setOpenModal}>Перейти</button>
      </div>
      {openModal &&
        <Modal
          store={store}
          list={list}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
          closeModal={setOpenModal}
        />}
    </>
  );
}

Controls.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func
};

export default React.memo(Controls);
