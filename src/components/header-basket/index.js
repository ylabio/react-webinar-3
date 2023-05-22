import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function HeaderBasket(props){
  return (
    <div className='HeaderBasket'>
      <span>В корзине:
        {props.totalCount > 0 ? 
        <span className='HeaderBasket-info'>{props.totalCount} {plural(props.totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / {props.totalPrice.toLocaleString()} &#8381;</span>
        : <span className='HeaderBasket-info'>пусто</span>
        }
        </span>
    </div>
  )
}

HeaderBasket.propTypes = {
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default React.memo(HeaderBasket);
