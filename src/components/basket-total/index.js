import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import cart_empty from '../../assets/icon/cart_empty.png';
import './style.css';

function BasketTotal({ sum = 0, t = text => text }) {
  const cn = bem('BasketTotal');

  if (sum === 0) {
    return (
      <div className="Cart-empty">
        <img src={cart_empty} alt="Empty Cart" />
        <b>{t('basket.info')}</b>
      </div>
    );
  }
  
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{t('basket.total')}</span>
      <span className={cn('cell')}>{numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  t: PropTypes.func,
};

export default memo(BasketTotal);
