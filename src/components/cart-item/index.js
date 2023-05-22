import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartItem(props){

  const callbacks = {
    onBtnClick: (e) => {
      e.stopPropagation();
      props.onBtnClick(props.item.code);
    }
  }

  return (
    <div className={'Cart-Item'}>
      <div className='Cart-Item-code'>{props.item.code}</div>
      <div className='Cart-Item-title'>
        {props.item.title}
      </div>
      <div className='Cart-Item-price'>{props.item.price.toLocaleString()}&nbsp;₽</div>
      <div className='Cart-Item-count'>{props.item.amount}&nbsp;шт.</div>
      <div className='Cart-Item-actions'>
        <button onClick={callbacks.onBtnClick}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onBtnClick: PropTypes.func
};

CartItem.defaultProps = {
  onBtnClick: () => {},
}

export default React.memo(CartItem);
