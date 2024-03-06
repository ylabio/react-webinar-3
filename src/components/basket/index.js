import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import List from '../list';

function Basket({ onModal, basket, onClick, totalSum }) {

    return (
        <>
            <div className='Modal-header'>
                <p className='Modal-title'>Корзина</p>
                <button onClick={onModal}>Закрыть</button>
            </div>
            <List list={basket} onClick={onClick} isInBasket={true} />
            <div className='Modal-total-cost'><span>Итого</span> <span className='Modal-sum'>{totalSum.toLocaleString('ru')}₽</span></div>
        </>

    )
}

Basket.propTypes = {
    onModal: PropTypes.func,
    basket: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
    })).isRequired,
    onClick: PropTypes.func,
};

Basket.defaultProps = {
    onClick: () => {
    },
}


export default React.memo(Basket)