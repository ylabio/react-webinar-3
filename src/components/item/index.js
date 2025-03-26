import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { plural } from '../../utils';
import './style.css';

function Item({ item, onAdd }) {
  // Счётчик выделений
  // const [count, setCount] = useState(0);
  //
  // const callbacks = {
  //   onClick: () => {
  //     props.onSelect(props.item.code);
  //     if (!props.item.selected) {
  //       setCount(count + 1);
  //     }
  //   },
  //   onDelete: e => {
  //     e.stopPropagation();
  //     props.onDelete(props.item.code);
  //   },
  // };

  return (
    <div className={'Item' + (item.selected ? ' Item_selected' : '')}>
      {/*<div className="Item-code">{props.item.code}</div>*/}
      <div className="Item-title">
        <b>{item.title}</b>
        <span>{item.price + ' ' + '₽'} </span>
        {/*{count*/}
        {/*  ? ` | Выделяли ${count} ${plural(count, {*/}
        {/*      one: 'раз',*/}
        {/*      few: 'раза',*/}
        {/*      many: 'раз',*/}
        {/*    })}`*/}
        {/*  : ''}*/}
      </div>
      <div className="Item-actions">
        <button
          // onClick={callbacks.onDelete}
          onClick={() => onAdd(item)}
        >
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
  }).isRequired,
  onAdd: PropTypes.func,
  // onDelete: PropTypes.func,
  // onSelect: PropTypes.func,
};

// Item.defaultProps = {
//   onDelete: () => {},
//   onSelect: () => {},
// };

export default React.memo(Item);
