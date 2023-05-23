import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import '../page-layout/style.css';
import {formatNumber, formatOrdinals} from "../../utils";

function Controls({itemsCount, sum, onGo}){
  return (
    <div className='Controls'>
      <div>В корзине: </div>
      <div className={'control-info'}>
        {itemsCount > 0 ?
          <span>{formatNumber(itemsCount)} товар{formatOrdinals(itemsCount)} / {formatNumber(sum)} &#8381;</span> :
          <span>Пусто</span>
        }
      </div>
      <div>
        <button className='button_cart button_pointer' onClick={() => onGo()}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  itemsCount: PropTypes.number,
  sum: PropTypes.number,
  onGo: PropTypes.func
};

Controls.defaultProps = {
  itemsCount: 0,
  sum: 0,
  onGo: () => {}
}

export default React.memo(Controls);
