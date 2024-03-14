import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}) {
  return (
    <div className="Controls">
      В корзине: 
      <div className="Cost">
        {cart.length
          ? `${cart.length} ${plural(cart.length, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${cost ? Intl.NumberFormat().format(cost) : 0} ₽`
          : "пусто"}
      </div>{" "}
      <button onClick={() => changeCartVisability()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  changeCartVisability: PropTypes.func,
};

Controls.defaultProps = {
  changeCartVisability: () => {},
};

export default memo(Controls);
