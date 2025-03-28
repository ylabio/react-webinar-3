import React from "react";
import PropTypes from 'prop-types';
import List from "../list";
import { useCart } from "../../cart-context";
import { IconCross } from "../icon";
import { calculateCartTotal, formatPrice } from "../../utils";
import { STRINGS } from "../../const";
import './style.css';

function Modal({ title }) {
  const { cart, isOpened, toggleCartModal } = useCart();
  const [shouldAnimateClose, setShouldAnimateClose] = React.useState(false);
  const cartIsEmpty = cart.length === 0

  const handleClose = () => {
    setShouldAnimateClose(true);

    const timer = setTimeout(() => {
      toggleCartModal();
      setShouldAnimateClose(false);
    }, 300);

    return () => clearTimeout(timer);
  };
  
  if (!isOpened) return null

  return (
    <div className={`Modal ${shouldAnimateClose ? 'closing' : ''}`}>
      <div className={`Modal-container ${shouldAnimateClose ? 'closing' : ''}`}>
        
        <div className="Modal-header">
          <h1>{title}</h1>
          <div className="Modal-cross" onClick={handleClose}>
            <IconCross />
          </div>
        </div>

        {cartIsEmpty && (
          <div className="Modal-hint">{STRINGS.EMPTY_CART_HINT}</div>
        )}

        <List list={cart} isCart={true}/>

        {!cartIsEmpty && (
          <div className="Modal-container-final-cost">
            <div>{STRINGS.FINAL}</div>
            <div className="Modal-cost">{formatPrice(calculateCartTotal(cart))}</div>
          </div>
        )}

      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired
};

export default React.memo(Modal);