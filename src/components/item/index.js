import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props) {

  const amountVisibility = props.isCart === true ? "Item-amount" : "hidden";
  const containerWidth = props.isCart === true ? "w25" : "w50";

  const callbacks = {
    onAdd: (e) => {
      props.onAdd(props.item);
    },
    onDelete: (e) => {
      props.onDelete(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className={'Item-title '}>
        {props.item.title}
      </div>
      <div className={"Item-price "+containerWidth}>
        {props.item.price} ₽
      </div>
      <div className={amountVisibility}>
        {props.amount} шт.
      </div>
      <div className='Item-actions'>
        <button onClick={props.isCart ? callbacks.onDelete : callbacks.onAdd}>
          {props.isCart ? "Удалить" : "Добавить"}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  amount: PropTypes.number,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {
  },
  onDelete: () => {
  },
}

export default React.memo(Item);
