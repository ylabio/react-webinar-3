import React from 'react'
import PropTypes from 'prop-types';
import './style.css';
import { plural, pluralCurrencies } from '../../utils'

function Controls({onOpenCart, textBtn, count, amount}) {
  return (
    <div className='Controls'>
      <p className='Controls__text'>В корзине: {count ?
        (<b>{count} {plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / {pluralCurrencies(amount)}</b>)
        :
        (<b>пусто</b>)}
      </p>
      <button onClick={() => onOpenCart()}>{textBtn}</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: PropTypes.func,
  textBtn: PropTypes.string,
  count: PropTypes.number,
  amount: PropTypes.number
};

Controls.defaultProps = {
  onOpenCart: () => {}
}

export default React.memo(Controls);
