import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { NavLink } from 'react-router';
import Cart from '../../assets/icon/cart.svg';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool(props) {
  const {
    onOpen = () => {},
    sum = 0,
    amount = 0,
    oneItemText = 'товар',
    fewItemsText = 'товара',
    manyItemsText = 'товаров',
    cartEmptyText = 'Пусто',
  } = props;

  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: oneItemText,
                few: fewItemsText,
                many: manyItemsText,
              })} / ${numberFormat(sum)} ₽`
            : cartEmptyText}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  oneItemText: PropTypes.string,
  fewItemsText: PropTypes.string,
  manyItemsText: PropTypes.string,
  cartEmptyText: PropTypes.string,
};

export default memo(BasketTool);
