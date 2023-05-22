import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import List from "../list";
import ItemBasket from "../item-basket";
import TotalBasket from "../total-basket";

function Basket({ basket, onDeleteItem, totalPrice }) {
  return (
    <div className="Basket">
      {basket.length > 0 ? (
        <>
          <List
            list={basket}
            ElementView={ItemBasket}
            onDeleteItem={onDeleteItem}
          />
          <TotalBasket totalPrice={totalPrice}/>
        </>
      ) : (
        <h2 className="Basket-empty">В корзине отсутвуют товары</h2>
      )}
    </div>
  );
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
      price: PropTypes.number,
    })
  ),
  onDeleteItem: PropTypes.func,
  totalPrice: PropTypes.number,
};

Basket.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(Basket);
