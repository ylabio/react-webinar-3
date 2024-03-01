import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({setOpen,totalProductPrice,productCount}) {
  return (
    <div className='Controls'>
			<p>В корзине: <b>{<span>{productCount} {plural(productCount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })}/{totalProductPrice} ₽</span>}</b>
			</p> 
      <button onClick={() => setOpen(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setOpen: PropTypes.func,
	totalProductPrice:PropTypes.number,
	productCount:PropTypes.number,
};

Controls.defaultProps = {
  setOpen: () => {}
}

export default React.memo(Controls);
