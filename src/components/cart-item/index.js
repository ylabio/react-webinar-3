import React from "react";
import PropTypes from "prop-types";
import { formatSum } from "../../utils";
import './style.css';

function CartItem({item, onClick}) {

    const onButtonClick = (e) => {
        e.stopPropagation();
        onClick(item.code);
    }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title} 
      </div>
      <div className='Item-price'>
        {formatSum(item.price, { style: 'currency', currency: 'RUB' })}
      </div>
      <div className='Item-amount'>
      {`${item.amount} шт`}
      </div>
      <div className='Item-actions'>
          <button className='Item-button' onClick={onButtonClick}>
            Удалить
          </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    amount: PropTypes.number
  }),
  onClick: PropTypes.func,
};

CartItem.defaultProps = {
  onClick: () => {},
}

export default React.memo(CartItem);
