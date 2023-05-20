import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Item from '../../item';
import List from '../../list';
import Popup from '../../popup';
import BasketTotal from "../total";
import './style.css';

/** Окно корзины на основе универсального Popup */

function BasketWindow({ list, info, onDelete, setOpen }) {
  
  // Специфичный итем для корзины
  const basketItem = useCallback(item => <Item
    item={item}
    onAction={onDelete}
    actionName="Удалить"
  />, []);

  return (
    <Popup title='Корзина' setActive={setOpen}>
      <List list={list} render={basketItem} />
      <BasketTotal info={info} />
    </Popup>
  );
}

BasketWindow.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  info: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired
}

BasketWindow.defaultProps = {
  list: [],
  info: { goods: 0, price: 0 },
  onDelete: () => { },
  setOpen: () => { }
}

export default React.memo(BasketWindow);