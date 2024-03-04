import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import CartInfo from '../cart-info';
import CartDetails from '../cart-details';
import Modal from '../modal'
import Button from '../button';
import './style.css';

function Cart(props) {

  const [isOpen, setIsOpen] = useState(false);

  const amount = Object.values(props.cart).length;
  const cost = props.items.reduce((prev, cur) => {
    return prev + cur.price * props.cart[cur.code]
  }, 0);

  const callbacks = {
    onOpen: useCallback((e) => {
       e.stopPropagation();
       setIsOpen(true);
     }),
    onClose: useCallback(() => setIsOpen(false)),
  }

  return (
    <div className='Cart'>
      <CartInfo amount={amount} cost={cost} />
      <Button className='Cart-btn'
              onOpen={callbacks.onOpen}
              title='Перейти'/>
      <Modal isOpen={isOpen} onClose={callbacks.onClose}>
        <CartDetails onClose={callbacks.onClose}
                     cost={cost}
                     {...props}
        />
      </Modal>
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