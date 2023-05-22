import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { plural } from '../../utils';

function Total(props) {
    return (
        <div className="Total">
            <div>Итого</div>
            <div>{props.fullPrice.toLocaleString('ru-RU')} ₽</div>
        </div>
    );
}

Total.propTypes = {
    fullPrice: PropTypes.number,
};

export default Total;
