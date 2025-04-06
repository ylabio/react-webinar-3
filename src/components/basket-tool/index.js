import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import { Link } from "react-router";

function BasketTool() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.page.currentPage,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onNavigateToMain: useCallback(() => store.actions.page.setCurrentPage('main'), [store])
  };


const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('main-link')}>
        {select.currentPage !== 'main' && (
        <Link to='/' onClick={callbacks.onNavigateToMain}>
          <button className={cn('action')}>
            Главная
          </button>
        </Link>
          )}
      </div>

      <div className={cn('actions')}>
        <button className={cn('action')} onClick={callbacks.openModalBasket}>
          <Cart className={cn('icon')}/>
          <span className={cn('total')}>
          {select.amount
            ? `${select.amount} ${plural(select.amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(select.sum)} ₽`
            : `пусто`}
        </span>
        </button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
