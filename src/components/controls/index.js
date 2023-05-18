import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({onModalOpen}){
  return (
    <div className='Controls'>
      <p className='controls-title'>В корзине:<span className='controls-counter'>{`2 ${plural(2, {one: 'товар', few: 'товара', many: 'товаров'})} / 223 ₽`}</span></p>
      <button onClick={() => onModalOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onModalOpen: PropTypes.func
};

Controls.defaultProps = {
  onModalOpen: () => {}
}

export default React.memo(Controls);
