import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import CartItem from "../cart-item";
import {cn as bem} from "@bem-react/classname";

function List({ list, onClickAction = () => {}, isCart = false }) {

  const cn = bem('List');

  return (
    <ul className={cn()}>
      {list.map(item => (
        <li key={item.code} className={cn("item")}>
          {!isCart
          ?<Item item={item} onClickAction={onClickAction} />
          : <CartItem item={item} onClickAction={onClickAction}/>}
       </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onClickAction: PropTypes.func,
};

export default React.memo(List);
