import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';
import Controls from "../controls";

function Item(props) {

  // Счётчик выделений
  // const [count, setCount] = useState(0);

  const callbacks = {
    onClick: () => {
      // props.onSelect(props.item.code);
      // if (!props.item.selected) {
      //   setCount(count + 1);
      // }
    },
    onDelete: (e) => {
      // e.stopPropagation();
      // props.onDelete(props.item.code);
    },
    onAdd: () => {
      props.onAddItemToBasket(props.item);
    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      {/*  {count ? ` | Выделяли ${count} ${plural(count, {*/}
      {/*  one: 'раз',*/}
      {/*  few: 'раза',*/}
      {/*  many: 'раз'*/}
      {/*})}` : ''}*/}
      </div>
      <div className='Item-actions'>
        <div>{props.item.price}</div> {/*отображение цены*/}
        <button onClick={callbacks.onAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number // Добавил цену
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onAddItemToBasket: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
  onAdd: () => {
  },
}

export default React.memo(Item);