import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Item from "../item";
import { plural } from "./../../utils";

function Controls({ cart, itogo, total, removeItem }) {
  let vis = React.createRef();
  return (
    <div className="Controls">
      <div>{`В корзине ${cart.length} ${plural(cart.length, {
        one: "товар",
        few: "товара",
        many: "товаров",
      })}`}</div>
      <button onClick={() => vis.current.classList.toggle("visible")}>
        Перейти
      </button>
      <div className="inv" ref={vis}>
        <div className="cartHead">
          <div>Корзина</div>
          <button onClick={() => vis.current.classList.toggle("visible")}>
            Закрыть
          </button>
        </div>
        {cart.map((i) => (
          <Item item={i} del="Удалить" itogo={itogo} removeItem={removeItem} />
        ))}
        <div className="itogo">{`Итого: ${total ? total : 0} `}&#8381;</div>
      </div>
    </div>
  );
}

Controls.propTypes = {
  itogo: PropTypes.func,
  removeItem: PropTypes.func,
  total: PropTypes.number,
  cart: PropTypes.object.isRequired,
};

Controls.defaultProps = {
  itogo: () => {},
  removeItem: () => {},
};

export default React.memo(Controls);
