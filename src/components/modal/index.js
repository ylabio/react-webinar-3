import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import List from '../list';

function Modal({ onModal, basket, onClick }) {

    const total = basket.reduce((acc, item) => {
        return acc + item.price * item.count
    }, 0)

    return (
        <div className='Modal-bg'>
            <div className='Modal-body'>
                <div className='Modal-header'>
                    <p className='Modal-title'>Корзина</p>
                    <button onClick={onModal}>Закрыть</button>
                </div>
                <List list={basket} onClick={onClick} isInBasket={true} />
                <div className='Modal-total-cost'><span>Итого</span> <span className='Modal-sum'>{total}₽</span></div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    onModal: PropTypes.func,
    basket: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
    })).isRequired,
    onClick: PropTypes.func,
};

Modal.defaultProps = {
    onClick: () => {
    },
}


export default React.memo(Modal)