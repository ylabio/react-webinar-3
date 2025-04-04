import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useCallback } from 'react';

function BasketTool() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  console.log(select.amount)
  console.log(select.sum)

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <a className='main-page-link' onClick={() => { navigate(routes.mainPagePath) }}>Главная</a>
      <button className={cn('action')} onClick={ useCallback(() => store.actions.modals.open('basket'), [store]) }>
        <Cart className={cn('icon')} />
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
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
