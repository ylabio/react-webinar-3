import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import BasketTool from '../basket-tool';
import PropTypes from 'prop-types';
import useStore from '../../store/use-store';

const HeaderTools = ({ handleOpen, amount, sum }) => {
    const store = useStore();
    const { catalog } = store.actions;

    const handleLinkClick = () => {
        catalog.setPage(1);
    }

    return (
        <div className='Product-page-tools'>
            <Link
                to={'/'}
                className='Product-page-link'
                onClick={handleLinkClick}
            >
                Главная
            </Link>
            <BasketTool onOpen={handleOpen} amount={amount} sum={sum} />
        </div>
    )
}

HeaderTools.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    amount: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
}

export default React.memo(HeaderTools);