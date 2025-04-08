import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { useLanguage } from '../../language-context';

function BasketTool({ onOpen, sum, amount }) {
  const { language } = useLanguage();
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: language === 'ru' ? 'товар' : 'item',
                few: language === 'ru' ? 'товара' : 'items',
                many: language === 'ru' ? 'товаров' : 'items',
              })} / ${numberFormat(sum)} ₽`
            : language === 'ru' ? 'пусто' : 'empty'}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
