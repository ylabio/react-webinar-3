import React from "react";
import PropTypes from 'prop-types';
import Modal from "../modal";
import {controlsInfoText, empty, goButtonText} from "../constants";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Controls({ store, openModal, setOpenModal, list, onAddItem, onDeleteItem }) {
  const { basketList } = store.getState();
  const cn = bem('Controls');

  const renderSumBasket = () => {
    let sumItems = 0;
    let sumPrice = 0;
    const uniqueItems = new Set(basketList);

    uniqueItems.forEach(item => sumItems += 1);
    basketList.forEach(item => sumPrice += item.price);

    return `${sumItems} / ${sumPrice} ₽`;
  };

  const renderInfo = () => {
    return `${basketList.length === 0 ? empty : renderSumBasket()}`;
  };

  return (
    <>
      <div className={cn()}>
        <div className={cn('info')}>
          <div>{controlsInfoText}</div>
          <div>{renderInfo()}</div>
        </div>
        <button onClick={setOpenModal}>{goButtonText}</button>
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
