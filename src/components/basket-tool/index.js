import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, valueLang}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{ valueLang ? 'В корзине:' : 'In the cart:' }</span>
      <span className={cn('total')}>
        {amount
          ? valueLang ? `${amount} ${plural(amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${numberFormat(sum)} ₽` 
          : `${amount} ${plural(amount, {
            one: 'product',
            other: 'products'
          }, 'en-EN')} / ${numberFormat(sum)} ₽` 
          : valueLang ? `пусто` : `empty`
        }
      </span>
      <button onClick={onOpen}>{ valueLang ? 'Перейти' : 'Follow' }</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  valueLang: PropTypes.bool,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  valueLang: true,
};

export default memo(BasketTool);
