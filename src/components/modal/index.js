import React, { useMemo } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import List from "../list";

const Modal = ({ products, setShowModal, remove }) => {

  const totalPrice = useMemo(() => {
    return products.reduce((acc, item) => acc += item.price * item.count, 0).toLocaleString('ru')
  }, [products])

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="cart-header">
          <h2>Корзина</h2>
          <button onClick={() => setShowModal(false)}>Закрыть</button>
        </div>
        {
          products.length
          ? <>
              <List list={products} remove={remove} isCart={true}/>
              <div className="total">Итого: <span>{totalPrice} &#8381;</span></div>
            </>
          : <h2 className="empty-cart">Корзина пуста</h2>
        }
      </div>
    </div>
  );
};

Modal.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  setShowModal: PropTypes.func,
  remove: PropTypes.func
};

Modal.defaultProps = {
  products: [],
  setShowModal: () => {},
  remove: () => {}
};

export default Modal;
