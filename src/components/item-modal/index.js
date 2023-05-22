import React, { useContext } from 'react';
import { Context } from '../context';
import { constructIntl } from '../../utils';
import PropTypes from "prop-types";
import './style.css';

function ItemModal({item, index}) {
    const { defaultContext, modifiedContext } = useContext(Context);

    const callbacks = {
        removeProduct: (id) => {
          const obj = defaultContext.filter(item => item.code !== id);
          modifiedContext([...obj]);
        },
    };

    return (
        <div className='Item'>
            <div className='Item-code'>{index+1}</div>
            <div className='Item-title'>{item.title}</div>
            <div className='Item-actions'>
                <span className="item_price">{constructIntl({method: 'NumberFormat', value: item.price})}</span>
                <span className="item_price">{item.count} шт.</span>
                <button onClick={() => callbacks.removeProduct(item.code)}>Удалить</button>
            </div>
        </div>
    );
};

ItemModal.propTypes = {
    item: PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
      price: PropTypes.number,
    }).isRequired,
    index: PropTypes.number,
};

export default ItemModal;