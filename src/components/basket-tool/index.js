import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { Link } from 'react-router'

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <nav className={cn('navigate')}>
        <ul className={cn('navigate-list')}>
          <li className={cn('navigate-item')}>
            <Link to={'/'} className={cn('navigate-link')}>Главная</Link>
          </li>
        </ul>
      </nav>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${numberFormat(sum)} ₽`
            : `пусто`}
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
