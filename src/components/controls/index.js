import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import '../page-layout/style.css';
import {Format_Price, Plurals} from "../../utils";
function Controls({itemsCount, sum, onOpenCart_button}){
    return (
        <div className='Controls'>
            <div>В корзине: </div>
            <div className={'control-info'}>
                {itemsCount > 0 ?
                    <span>{itemsCount} товар{Plurals(itemsCount)} / {Format_Price(sum)} &#8381;</span> :
                    <span>Пусто</span>
                }
            </div>
            <div>
                <button className='button_cart button_pointer' onClick={() => onOpenCart_button()}>Перейти</button>
            </div>
        </div>
    )
}

Controls.propTypes = {
    itemsCount: PropTypes.number,
    sum: PropTypes.number,
    onOpenCart_button: PropTypes.func
};

Controls.defaultProps = {
    itemsCount: 0,
    sum: 0,
    onGo: () => {}
}

export default React.memo(Controls);