import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural, getPrice, getUniqeItems} from "../../utils"

function Controls(props) {

  let total = 'пусто';

  if(props.items.length) {
    const pluralValue = plural(props.items, {one: 'товар', few: 'товара', many: 'товаров'});

    const price = getPrice(props.items);

    total = getUniqeItems(props.items).length + " " + pluralValue + " / " + price.toLocaleString()  + " ₽";
  }

  const callbacks = {
    onClick: (value) => {
      document.body.style.overflow = 'hidden';
      props.onShowCart(value);
    }
  }

  return (
    <div className='Controls'>
      <span>В корзине:
        <b>{total}</b>
      </span>
      <button onClick={() => callbacks.onClick(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  })),
  onShowCart: PropTypes.func
};

Controls.defaultProps = {
  items: [],
  onShowCart: () => {}
}

export default React.memo(Controls);
