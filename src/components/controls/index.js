import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({onOpenModal, cartInfo}){
    return (
    <div className='Controls'>
      <div className='Controls-cart-info'>
        <p>В корзине: <strong>{cartInfo.count ? `${cartInfo.count} ${plural(cartInfo.count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${new Intl.NumberFormat('ru-RU').format(cartInfo.totalPrice)} ₽  `  : 'пусто'}</strong></p>
      </div>
      <button onClick={() => onOpenModal()}>Перейти</button>
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
