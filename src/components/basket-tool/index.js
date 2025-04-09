import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: props.amountText?.one || 'товар',
                few: props.amountText?.few || 'товара',
                many: props.amountText?.many || 'товаров',
              })} / ${numberFormat(sum)} ₽`
            : props.amountText?.empty || 'Пусто'}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  amountText: PropTypes.shape({
    one: PropTypes.string,
    few: PropTypes.string,
    many: PropTypes.string,
    empty: PropTypes.string,
  }),
};

export default memo(BasketTool);
