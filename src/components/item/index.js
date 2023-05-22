import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { pluralPrice } from '../../utils'
import Button from '../button'
import './style.css';

function Item({
  item,
  itemButtonText,
  onButtonClick
}) {

  const callbacks = {
    handleOnClick: useCallback(() => {
      onButtonClick(item)
    }, []),
  }

  return (
    <div className='item'>
      <div className='item__code'>{item.code}</div>
      <div className='item__title'>{item.title}</div>
      <div className="item__price">{pluralPrice(item.price)}</div>
      {item.value && <p className="item__value">{`${item.value} шт`}</p>}
      <div className='item__actions'>
        <Button buttonText={itemButtonText} onClick={callbacks.handleOnClick} />
      </div>
    </div >
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  itemButtonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

Item.defaultProps = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }),
  itemButtonText: '',
  onButtonClick: () => { }
}

export default Item;
