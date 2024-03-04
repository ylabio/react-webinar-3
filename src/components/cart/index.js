import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Item from "../item";
import {getUniqeItems, getPrice} from "../../utils"

function Cart(props) {

  const uniqueItems = getUniqeItems(props.items);

  const totalPrice =  getPrice(props.items);

  const callbacks = {
    onClose: (value) => {
      props.onCloseCart(value);
    },

    onDelete: (item) => {
      props.onDeleteItem(item);
    }
  }

  return (
    <div className='Body'>
      <div className='Overlay' onClick={() => callbacks.onClose(false)}></div>
      <div className='Cart'>
        <div className="Cart-title">
          <h2>Корзина</h2>
          <button onClick={() => callbacks.onClose(false)}>
            Закрыть
          </button>
        </div>
        {uniqueItems.map(item => {
          const count = props.items.filter((i) => i.title === item.title).length;

          return(
            <div key={item.code} className='List-item'>
              <Item item={item} title='Удалить' count={count}
                onClick={callbacks.onDelete}/>
            </div>
          )})
        }
        <div className="Cart-price">
          <span>Итого</span> {totalPrice + " ₽"}
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  })),
  onCloseCart: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Cart.defaultProps = {
  items: [],
  onCloseCart: () => {},
  onDeleteItem: () => {}
}

export default React.memo(Cart);
