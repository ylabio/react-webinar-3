import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from '../head/index';
import List from "../list";

function Popup(props) {
  console.log(props);

  return (
    <div className='Popup'>
      <div className={`Popup-overlay ${props.isPopupOpened ? 'Popup-opened' : ''}`}>
        <div className='Popup-container'>
          <div className='Popup-header'>
            <Head title='Корзина'/>
            <button onClick={props.onClose} className='Popup-btn' type="button">Закрыть</button>
          </div>
          <div className='Popup-list'>
            {props.basket.length === 0 ?
            <div className='Popup-text'>Упс. В корзине пока пусто</div>
            :
            <List list={props.basket} onClick={props.onRemoveFromBasket}/>
            }
          </div>
          <div className='Popup-cost'>
            <p className='Popup-cost-title'>Итого: </p>
            <div className='Popup-cost-number'>{props.totalCost()} ₽</div>
          </div>
        </div>
      </div>
    </div>
  )
}

Popup.propTypes = {
  isPopupOpened: PropTypes.bool,
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  totalCost: PropTypes.func,
  onClose: PropTypes.func,
  onRemoveFromBasket: PropTypes.func
};

Popup.defaultProps = {
  onClose: () => {},
  onRemoveFromBasket: () => {}
}

export default React.memo(Popup);