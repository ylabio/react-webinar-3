import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls(
    {
        countPrice,
        products,
        showModal
    }
) {


    return (
        <>
            <div className='Controls'>
                <p className={'controls__title'}>В корзине:</p>
                <h3 className={'controls__count'}>{products.length >0 ? ` ${products.length} ${plural(products.length, {one: 'товар', few: 'товара', many: 'товаров'})}` : 'пусто'} {countPrice > 0 ? (' / '+countPrice.toLocaleString() + ' ₽'): ''}</h3>
                <button className={'controls__btn'} onClick={() => showModal()}>Перейти</button>
            </div>
        </>
    )
}

Controls.propTypes = {
    onAdd: PropTypes.func
};

Controls.defaultProps = {
    onAdd: () => {
    }
}

export default React.memo(Controls);
