import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartBtn from "../cart/cart-button";
import CartModal from "../cart/cart-modal";

function Controls({ cart = [], onDeleteFromCart = () => {} }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="Controls">
      <CartBtn
        cart={cart}
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      />
      {isModalOpen &&
        <CartModal
          onDeleteFromCart={onDeleteFromCart}
          cart={cart}
          setIsModalOpen={setIsModalOpen}
        />
      }
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteFromCart: PropTypes.func,
};

export default React.memo(Controls);
