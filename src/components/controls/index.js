import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({onOpen, count, summa}){
  return (
    <div className='Controls'>
      <p className="Controls-info">В корзине: 
        <span className="Controls-span">
          {count !== 0? ` ${count.toLocaleString()} ${plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${summa.toLocaleString()}  ₽` : ' пусто'}
        </span>
      </p>
      <button onClick={() => onOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: PropTypes.func
};

Controls.defaultProps = {
  onOpen: () => {}
}

export default React.memo(Controls);
