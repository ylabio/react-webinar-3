import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import Cart from '../../assets/icon/cart.svg';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ sum = 0, amount = 0, onOpen = () => {}, t = text => text }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: t('basket.articles.one'),
                few: t('basket.articles.few'),
                many: t('basket.articles.many'),
              })} / ${numberFormat(sum)} ₽`
            : t('basket.empty')}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  t: PropTypes.func,
};

export default memo(BasketTool);
