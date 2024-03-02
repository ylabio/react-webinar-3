import React, {useState} from 'react';
import PropTypes from 'prop-types';
import CartInfo from '../cart-info';
import CartDetails from '../cart-details/cart-details';
import './style.css';

function Cart(props) {

  const [isOpen, setIsOpen] = useState(false);

  const amount = Object.values(props.cart).length;
  const cost = props.items.reduce((prev, cur) => {
    return prev + cur.price * props.cart[cur.code]
  }, 0);

  const onOpen = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  }

  return (
    <div className='Cart'>
      <CartInfo amount={amount} cost={cost} />
      <button className='Cart-btn'
              onClick={onOpen}
      >
        Перейти
      </button>
      {isOpen && <CartDetails isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    cost={cost}
                    {...props}
      />}
    </div>
  )
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  cart: PropTypes.objectOf(PropTypes.number).isRequired,
  onRemove: PropTypes.func,
};

export default React.memo(Cart);