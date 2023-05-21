import React from "react";
import PropTypes from "prop-types";

import Head from "../head";
import "./style.css";

function Cart({ isVisible, showModal, productsInCart, onDeleteItem }) {
  return (
    isVisible && (
      <div className="Cart-wrapper" onClick={() => showModal(false)}>
        <div className="Cart" onClick={(e) => e.stopPropagation()}>
          <Head title="Корзина">
            <button
              className="Cart-close-button"
              onClick={() => showModal(false)}
            >
              Закрыть
            </button>
          </Head>

          <table className="Cart-table">
            <tbody>
              {productsInCart.map((item) => (
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td width="620">{item.title}</td>
                  <td>{`${item.price} \u20bd`}</td>
                  <td>{`${item.countInCart} шт`}</td>
                  <td>
                    <button onClick={() => onDeleteItem(item.code)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
              <tr style={{ fontWeight: "bold" }}>
                <td></td>
                <td></td>
                <td>Итого</td>
                <td>
                  {`${productsInCart.reduce(
                    (acc, item) => acc + item.price * item.countInCart,
                    0
                  )} \u20bd`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

Cart.propTypes = {
  isVisible: PropTypes.bool,
  showModal: PropTypes.func,

  productsInCart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      countInCart: PropTypes.number,
    })
  ).isRequired,

  onDeleteItem: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(Cart);
