import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";
import {cn as bem} from "@bem-react/classname";

function Controls({cart, totalPrice, setActive}){
    const cn = bem('Controls');
    return (
    <div className={cn()}>
      <p className={cn("info")}>
        В корзине:
        <span className={cn("price")}>
          {cart.length ? `${cart.length} ${plural(cart.length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${totalPrice} ₽` : 'пусто'}
        </span>
      </p>
      <button className={cn("button")} onClick={() => setActive(true)}>Перейти</button>
    </div>
    )
}

Controls.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
    })).isRequired,
    setActive: PropTypes.func,
    totalPrice: PropTypes.number,
};

Controls.defaultProps = {
}

export default React.memo(Controls);
