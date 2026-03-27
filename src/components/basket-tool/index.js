import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';

function BasketTool({ sum, amount, onOpen, t }) {
  const cn = bem('BasketTool');
  
  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, t('basket.articles', { returnObjects: true }))} / ${numberFormat(sum, undefined, { maximumFractionDigits: 0 })} ₽`
            : t('basket.empty')}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default memo(BasketTool);
