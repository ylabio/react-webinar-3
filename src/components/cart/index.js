import React from "react";
import PropTypes from "prop-types";
import { numberWithSpaces } from "../../utils";
import "./style.css";
import Head from "../head";
import List from "../list";

function Cart({ active, setActive, cartList, onDeleteItem, totalPrice }) {
  return (
    <div
      className={active ? "Cart Active" : "Cart"}
      onClick={() => setActive(false)}
    >
      <div className="Cart__content" onClick={(e) => e.stopPropagation()}>
        <Head title="Корзина">
          <div>
            <button onClick={() => setActive(false)}>Закрыть</button>
          </div>
        </Head>

        {cartList.length > 0 ? (
          <>
            <List list={cartList} buttonText="Удалить" onClick={onDeleteItem} />
            <div className="Cart__content-total">
              <div className="Cart__content-price">
                <span>Итого</span>{" "}
                <span>
                  {numberWithSpaces(totalPrice)} <span>₽</span>
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="Cart__content-empty">Ваша корзина пуста</div>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  totalPrice: PropTypes.number,
};

Cart.propTypes = {
  totalPrice: PropTypes.number,
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,

  onClick: PropTypes.func,
};

Cart.defaultProps = {
  onClick: () => {},
};

export default React.memo(Cart);
