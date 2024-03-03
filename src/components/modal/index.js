import React from "react";
import PropTypes from 'prop-types';
import List from "../list";
import { basketText, closeButtonText, emptyBasketText } from "../constants";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal(props) {
  const cn = bem('Modal');
  const { store, list, onAddItem, onDeleteItem, closeModal } = props;
  const { basketList } = store.getState();
  const basketTitle = 'Корзина';
  const closeButtonText = 'Закрыть';
  const emptyBasketText = 'В корзине пусто';

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <h1>{basketText}</h1>
        <button onClick={closeModal}>{closeButtonText}</button>
      </div>
      {basketList.length
        ? <List
          list={list}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
          isBasket={true}
        />
        : <p>{emptyBasketText}</p>
      }
    </div>
  );
}

Modal.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  closeModal: PropTypes.func,
};

export default React.memo(Modal);
