import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({ onGoToCart, count, sum }) {
    return (
        <div className='Controls'>
            <div className="InCart">
                В корзине:
            </div>
            <div className="Count">
                {count ?
                    `${count} ${plural(count, { one: "товар", few: "товара", many: "товаров" })} / ${sum}`
                    :
                    "пусто"}
            </div>
            <button onClick={onGoToCart}>Перейти</button>
        </div>
    )
}

Controls.propTypes = {
    onGoToCart: PropTypes.func,
    sum: PropTypes.string,
    count: PropTypes.number
};

Controls.defaultProps = {
    onGoToCart: () => { }
}

export default React.memo(Controls);
