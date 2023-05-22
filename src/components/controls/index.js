import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { plural } from '../../utils';

function Controls(props) {
    const callbacks = {
        onToggleModal: () => {
            props.toggleModal();
        },
    };

    return (
        <div className="Controls">
            <p className="Controls-text">В корзине:</p>
            <div className="Controls-data">
                {props.fullCount
                    ? `${props.fullCount} ${plural(props.fullCount, {
                          one: 'товар',
                          few: 'товара',
                          many: 'товаров',
                      })} / ${props.fullPrice.toLocaleString('ru-RU')} ₽`
                    : 'пусто'}
            </div>
            <button onClick={callbacks.onToggleModal}>Перейти</button>
        </div>
    );
}

Controls.propTypes = {
    toggleModal: PropTypes.func,
    fullCount: PropTypes.number,
    fullPrice: PropTypes.number,
};

Controls.defaultProps = {
    toggleModal: () => {},
};

export default React.memo(Controls);
