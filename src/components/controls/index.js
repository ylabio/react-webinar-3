import React, {useState} from "react";
import PropTypes from 'prop-types';
import { plural, numberFormat } from "../../utils";
import Cart from "../cart";
import "./style.css";

function Controls({cart, action}){
  const [open, setOpen] = useState(false);

  const total = cart.reduce((x, y) => {
    return x + y.price * y.total;
  }, 0);

  const openWindow = () => {
    setOpen(!open);
  };

  return (
    <div className='Controls'>
      <div className="Details">
        <span className="Cart-title">В корзине:</span>
        <b>{!!cart.length
                ? `${cart.length} ${plural(cart.length, {
                    one: "товар",
                    few: "товара",
                    many: "товаров",
                  })} / ${numberFormat(total)}`
                : "пусто"}
        </b>
      </div>
      <button onClick={openWindow}>Перейти</button>
      {open && (
        <Cart 
          openWindow={openWindow}
          cart={cart}
          total={total}
          action={action}
        />
      )}
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
