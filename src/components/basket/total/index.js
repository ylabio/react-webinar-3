import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

/**
 * Блок "Итого: ..." для корзины
 */

function BasketTotal({ info }) {
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      {info.goods ?
        <>
          <div className={cn('text')}>Итого</div>
          <div className={cn('value')}>{info.price.toLocaleString('ru-RU') + ' ₽'}</div>
        </>
        : <div className={cn('text_empty')}>Нет товаров в корзине!</div>
      }
    </div>
  );
}

BasketTotal.propTypes = {
  info: PropTypes.object
}

BasketTotal.defaultProps = {
  info: { goods: 0, price: 0 }
}

export default React.memo(BasketTotal);