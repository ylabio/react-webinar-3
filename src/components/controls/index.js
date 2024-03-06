import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Item from "../item";
import { plural } from "./../../utils";


let fn = (cart, total) => {
  if (cart.length > 0) {
    return (
      <div>
        В корзине:
        <b>
          {" "}
          {`${cart.length} ${plural(cart.length, {
            one: "товар",
            few: "товара",
            many: "товаров",
          })} / ${total} \u20BD;`}
        </b>
      </div>
    );
  } else {
    return (
      <div>
        В корзине: <b>пусто</b>
      </div>
    );
  }
};

function Controls({ cart, itogo, total, removeItem }) {
  let vis = React.createRef();
  return (
    <div className="Controls">
      <div>{fn(cart, total)}</div>
      <button onClick={() => vis.current.classList.toggle("visible")}>
        Перейти
      </button>

      <div className="inv Center" ref={vis}>
        <div className="cartHead Head">
          <h1>Корзина</h1>
          <button
            className="cartHead_btn"
            onClick={() => vis.current.classList.toggle("visible")}
          >
            Закрыть
          </button>
        </div>
        <div>
          {cart.map((i) => (
            <Item
              item={i}
              del="Удалить"
              itogo={itogo}
              removeItem={removeItem}
            />
          ))}
        </div>
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
