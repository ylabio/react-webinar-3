import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addSpaceToNumber, plural } from "../../utils";
import Modal from "../modal";
import "./style.css";

function Controls({ cart, handleDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleModal = () => setIsModalOpen((prevState) => !prevState);

  useEffect(() => {
    let totalCount = cart.reduce((acc, item) => acc + item.count, 0);
    setCount(totalCount);

    let total = cart.reduce((acc, item) => {
      if (item.count > 1 && item.price !== 0) {
        return acc + item.price * item.count;
      } else {
        return acc + item.price;
      }
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  return (
    <>
      <div className="Controls">
        <div className="Controls-text">
          В корзине:{" "}
          <strong>
            {count === 0
              ? "пусто"
              : `${count} ${plural(count, {
                  one: "товар",
                  few: "товара",
                  many: "товаров",
                })} /${addSpaceToNumber(totalPrice)} ₽`}
          </strong>
        </div>
        <button onClick={toggleModal}>Перейти</button>
      </div>
      {isModalOpen && (
        <Modal
          toggleModal={toggleModal}
          cart={cart}
          handleDelete={handleDelete}
          totalPrice={totalPrice}
        />
      )}
    </>
  );
}

Controls.propTypes = {
  cart: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default React.memo(Controls);
