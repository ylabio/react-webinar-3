import React from 'react';
import PropTypes from 'prop-types';
// import { plural } from '../../utils';
import './style.css';

function Item({ item, onAction, mode }) {
  const isCart = mode === 'cart';
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
        {/*{count*/}
        {/*  ? ` | Выделяли ${count} ${plural(count, {*/}
        {/*      one: 'раз',*/}
        {/*      few: 'раза',*/}
        {/*      many: 'раз',*/}
        {/*    })}`*/}
        {/*  : ''}*/}
      </div>
      <div className="Item-actions">
        {isCart ? (
          <>
            <div className="CartItem-details">
              <span className="Item-count">{item.count} шт</span>
              <span className="Item-count-price">
                {(item.price * item.count).toLocaleString()} ₽
              </span>
            </div>
            <button className="cart" onClick={() => onAction(item.code)}>
              Удалить
            </button>
          </>
        ) : (
          <>
            <span className="Item-price">{item.price.toLocaleString()} ₽</span>
            <button className="catalog" onClick={() => onAction(item.code)}>
              Добавить
            </button>
          </>
        )}
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
  onAction: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['catalog', 'cart']).isRequired,
  // onDelete: PropTypes.func,
  // onSelect: PropTypes.func,
};

// Item.defaultProps = {
//   onDelete: () => {},
//   onSelect: () => {},
// };

export default React.memo(Item);
