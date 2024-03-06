import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import {getUniqeItems, getPrice} from "../../utils"
import './style.css';

function Cart(props) {
  const uniqueItems = getUniqeItems(props.items);

  const totalPrice =  getPrice(props.items);

  const callbacks = {
    onClose: (value) => {
      document.body.style.overflow = 'visible';
      props.onCloseCart(value);
    },

    onDelete: (item) => {
      props.onDeleteItem(item);
    }
  }

  return (
    <>
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
        <span>Итого</span> {totalPrice.toLocaleString()  + " ₽"}
      </div>
    </>
  )
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  })),
  title: PropTypes.string,
  onCloseCart: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Cart.defaultProps = {
  items: [],
  title: '',
  onCloseCart: () => {},
  onDeleteItem: () => {}
}

export default React.memo(Cart);
