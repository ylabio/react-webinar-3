import React from "react";
import PropTypes from 'prop-types';
import { plural, numberFormat } from "../../utils";
import './style.css';

/**
 * Панель с количеством и стоимостью товаров в корзине
 * и с кнопкой для открытия модального окна с корзиной
 */
function Scoreboard(props) {
  return (
    <div className='Scoreboard'>
      <div className='Scoreboard-title'>
        <div className='Scoreboard-label'>В корзине:</div>
        <div className='Scoreboard-value'>
          {
            props.count
              ? props.count + ' ' + plural(props.count, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров'
                }) + ' / ' + numberFormat(props.price)
              : 'пусто'
          }
        </div>
      </div>
      <div className='Scoreboard-controls'>
        <button
          className='action'
          onClick={props.showBasket}>
            Перейти
        </button>
      </div>
    </div>
  )
}

Scoreboard.propTypes = {
  count: PropTypes.number,    //  Количество товаров в корзине
  price: PropTypes.number,    //  Стоимость товаров в корзине
  showBasket: PropTypes.func  //  Callback для открытия модального окна с корзиной
};

Scoreboard.defaultProps = {
  count: 0,
  price: 0,
  showBasket: () => {}
}

export default React.memo(Scoreboard);