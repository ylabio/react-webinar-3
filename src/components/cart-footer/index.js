
import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { priceFormatter } from '../../utils';

function CartFooter( {totalSum} ) {

    return (        
        <div className='Cart-footer'> <span className='Cart-text'>Итого</span> {priceFormatter(totalSum)} </div> 
    )
}

CartFooter.propTypes = {
    totalSum: PropTypes.number,
  };

export default CartFooter;