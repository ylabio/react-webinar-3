import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import ModalLayout from "../modal-layout";
import ModalItem from "../modal-item";
import "./style.css";
import { addSpaceToNumber } from "../../utils";

function Modal({ toggleModal, cart, handleDelete, totalPrice }) {
  const hasItems = cart.length !== 0;

  return (
    <div className="Modal">
      <div className="ModalBackdrop"></div>
      <ModalLayout>
        <Head title="Корзина" showButton={true} toggleModal={toggleModal} />
        <div>
          {hasItems ? (
            cart.map((item, index) => (
              <ModalItem
                key={`modal-item-${index}`}
                item={item}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <div className="Modal-item-empty">Ваша корзина пуста🤷‍♂️</div>
          )}
        </div>
        {hasItems && (
          <div>
            <div className="Modal-item-info">
              <div>Итого</div>
              <div>{addSpaceToNumber(totalPrice)} ₽</div>
            </div>
          </div>
        )}
      </ModalLayout>
    </div>
  );
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
  toggleModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default Modal;
