import React from "react";
import PropTypes from 'prop-types';
import { plural, formatCurrency } from "../../utils";
import './style.css';

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
                }) + ' / ' + formatCurrency(props.price)
              : 'пусто'
          }
        </div>
      </div>
      <div className='Scoreboard-controls'>
        <button onClick={() => {}}>Перейти</button>
      </div>
    </div>
  )
}

Scoreboard.propTypes = {
  count: PropTypes.number,
  price: PropTypes.number
};

Scoreboard.defaultProps = {
  count: 0,
  price: 0
}

export default React.memo(Scoreboard);