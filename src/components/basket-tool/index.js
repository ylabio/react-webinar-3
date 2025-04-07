import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import useSelector from '../../store/use-selector';

function BasketTool(props) {
  const { onOpen = () => {} } = props;
  const cn = bem('BasketTool');

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {select.amount
            ? `${select.amount} ${plural(select.amount, {
                one: props.translations.basketTool.one,
                few: props.translations.basketTool.few,
                many: props.translations.basketTool.many,
              })} / ${numberFormat(select.sum)} ₽`
            : props.translations.basketTool.empty}
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
