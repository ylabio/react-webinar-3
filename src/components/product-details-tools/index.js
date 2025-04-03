import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import BasketTool from '../basket-tool';
import PropTypes from 'prop-types';

const ProductDetailsTools = ({ handleOpen, amount, sum }) => {
    return (
        <div className='Product-page-tools'>
            <Link to={'/'} className='Product-page-link'>Главная</Link>
            <BasketTool onOpen={handleOpen} amount={amount} sum={sum} />
        </div>
    )
}

ProductDetailsTools.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    amount: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
}

export default React.memo(ProductDetailsTools);