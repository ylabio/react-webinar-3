import React from "react";
import PropTypes, { number, string } from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Item from "../item";
import './style.css';
import BasketItem from "../basket-item";

function List({list, showBasket, addItem, removeItems, basketCounter}) {

  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map(item =>
        (!showBasket) ? <div key={item.code} className={cn('item')}>
                          <Item item={item} addItem={addItem} basketCounter={basketCounter} />
                        </div>
                        : (showBasket && item.quantity > 0 && <div key={item.code} className={cn('item')}>
                                          <BasketItem item={item} removeItems={removeItems} />
                                        </div>)
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  showBasket: PropTypes.bool,
  addItem: PropTypes.func,
  removeItems: PropTypes.func,
  basketCounter: PropTypes.objectOf(number),
};

List.defaultProps = {
  list: [
    {code: 1}
  ]
}

export default React.memo(List);
