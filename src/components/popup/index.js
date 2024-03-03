import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Item from "../item";

function Popup({totalCost, onRemoveItemFromBasket, basket, isPopupopened, onClose}) {
  const callbacks = {
    onRemoveItemFromBasket: (e,item) => {
      console.log(item);
      e.stopPropagination;
      onRemoveItemFromBasket(item);
    }
  }

  return (
    <div className='Popup'>
      <div className={`Popup-overlay ${isPopupopened ? 'Popup-opened' : ''}`}>
        <div className='Popup-container'>
          <div className='Popup-header'>
            <h2 className='Popup-title'>Корзина</h2>
            <button onClick={onClose} className='Popup-btn' type="button">Закрыть</button>
          </div>
          <ul className='Popup-list'>
            {basket && basket.map((item) => {
              return (
                <li key={item.code} className='Popup-item'>
                  <div className='Popup-item-container'>
                    <div className='Popup-item-code'>{item.code}</div>
                    <p className='Popup-item-title'>{item.title}</p>
                  </div>
                  <div className='Popup-item-wrapper'>
                    <div className='Popup-item-cost'>{item.price} ₽</div>
                    <div className='Popup-item-count'>{item.count} шт</div>
                    <button onClick={callbacks.onRemoveItemFromBasket}>Удалить</button>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className='Popup-cost'>
            <p className='Popup-cost-title'>Итого: </p>
            <div className='Popup-cost-number'>{totalCost()} ₽</div>
          </div>
        </div>
      </div>
    </div>
  )
}

Popup.propTypes = {
  onClose: PropTypes.func,
};

Popup.defaultProps = {
  onClose: () => {}
}

export default React.memo(Popup);