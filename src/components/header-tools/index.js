import React from 'react';
import './style.css'
import BasketTool from '../basket-tool';
import PropTypes from 'prop-types';
import BackLink from '../back-link';

const HeaderTools = ({ handleOpen, handleLinkClick, amount, sum }) => {

    return (
        <div className='Product-page-tools'>
            <BackLink titleKey={'backLink'} handleLinkClick={handleLinkClick} />
            <BasketTool onOpen={handleOpen} amount={amount} sum={sum} />
        </div>
    )
}

HeaderTools.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    amount: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
    handleLinkClick: PropTypes.func,
}

export default React.memo(HeaderTools);