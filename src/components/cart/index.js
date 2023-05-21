import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../controls';
import {plural} from '../../utils';
import './style.css';
function Cart({count, totalPrice, onModalOpen}){
  return ( 
    <div className='Cart'>
      <div className='Cart-content'>
        В корзине:
        {count ?
        <b className='Cart-text'>
          {count} {plural(count, {one: 'товар', few: 'товара', many: 'товаров'})} / {totalPrice}
        </b>
        : 
        <b className='Cart-text'>пусто</b>
        }
        </div>
      <Controls onClickOpen={onModalOpen}/>
    </div>
  )
}

Cart.propTypes = {
  totalPrice: PropTypes.string,
  count: PropTypes.number,
  onModalOpen: PropTypes.func,
};

Cart.defaultProps = {
  onModalOpen: () => {},
}

export default React.memo(Cart);
