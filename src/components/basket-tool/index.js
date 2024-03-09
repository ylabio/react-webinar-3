import {memo, useCallback} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import './style.css';

function BasketTool() {

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  const store = useStore();
  const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store]);

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {select.amount
          ? `${select.amount} ${plural(select.amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${numberFormat(select.sum)} ₽`
          : `пусто`
        }
      </span>
      <button onClick={openModalBasket}>Перейти</button>
    </div>
  );
}

BasketTool.propTypes = {
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
