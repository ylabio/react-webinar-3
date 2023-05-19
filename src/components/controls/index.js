import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {getNumberFormat, plural} from "../../utils";

function Controls({onOpenModal, cartInfo}){
    return (
    <div className='Controls'>
      <div className='Controls-cart-info'>
        <p>В корзине: <strong>{cartInfo.count ? `${cartInfo.count} ${plural(cartInfo.count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${getNumberFormat(cartInfo.totalPrice)} ₽  ` : 'пусто'}</strong></p>
      </div>
      <button onClick={() => onOpenModal()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
    onOpenModal: PropTypes.func,
    cartInfo: PropTypes.object
};

Controls.defaultProps = {
    onOpenModal: () => {}
}

export default React.memo(Controls);
