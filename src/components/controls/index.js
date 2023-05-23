import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {plural, priceFormatting} from "../../utils";
import {cn as bem} from '@bem-react/classname';


function Controls({ orders, totalSumCart, setActive }) {  

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('cart')}>          
        В корзине: <strong>{orders.length ? `${orders.length} ${plural(orders.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${priceFormatting(totalSumCart)}` : 'пусто'}</strong>        
      </div>  
      <div className={cn('button')}>  
        <button onClick={() => setActive(true)}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired, 
  totalSumCart: PropTypes.number,
  setActive: PropTypes.func
};

Controls.defaultProps = {
  setActive: () => {},
};

export default React.memo(Controls);
