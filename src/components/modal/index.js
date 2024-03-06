import React from "react";
import PropTypes from 'prop-types';
import List from "../list";
import { TEXT } from "../constants";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal(props) {
  const cn = bem('Modal');
  const { list, onAddItem, onDeleteItem, closeModal } = props;

  return (
    <>
      <div className={cn()}>
        <div className={cn('header')}>
          <h1>{TEXT.BASKET}</h1>
          <button onClick={closeModal}>{TEXT.CLOSE}</button>
        </div>
        <List
          list={list}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
          isBasket={true}
        />
      </div>
      <div className={cn('layout')} />
    </>
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
