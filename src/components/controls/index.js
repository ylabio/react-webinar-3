import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {numberWithSpaces, plural} from "../../utils";

function Controls({setOpen,totalProductPrice,productCount}) {
  return (
    <div className='Controls'>
			<p>В корзине:{productCount>0?<b>{<span>{productCount} {plural(productCount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / {numberWithSpaces(totalProductPrice)} ₽</span>}</b>:<b>пусто</b>} 
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
