import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Controls from '../controls';
import { cn as bem } from '@bem-react/classname';

function Item( {item,
  onAddItemtoCart = () => {},
}) {
  // Счётчик выделений
  // const [count, setCount] = useState(0);
  // const price = (new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" }).format(
  //   props.item.price));
  const callbacks = {
    // onClick: () => {
    //   onSelect(item.code);
    //   if (!item.selected) {
    //     setCount(count + 1);
    //   }
    // },
    onAddItemtoCart: e => {
      e.stopPropagation();
      onAddItemtoCart(item.code);

    },
  };

  const cn = bem("Item")

  return (
    <div
      className={cn()}
      onClick={callbacks.onClick}
    >
      <div className={cn("title")}>
        <b>{item.title}</b>
      </div>
      <div>
        <p>{item.price} ₽</p>
      </div>
      <div className={cn("actions")}>
        <Controls  handleClick={callbacks.onAddItemtoCart} styles={cn("controls" )}title="Добавить"/>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAddItemtoCart: PropTypes.func,
};

// Item.defaultProps = {
//   onDelete: () => {},
//   onSelect: () => {},
// };

export default React.memo(Item);
