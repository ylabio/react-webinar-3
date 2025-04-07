import { memo } from 'react';
import PropTypes, { string } from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';

function BasketTool(props,) {
  const { onOpen = () => {}, sum = 0, amount = 0 ,itemsMessage, emptyMessage} = props;

  const cn = bem('BasketTool');
  const one = itemsMessage.one;
  const few = itemsMessage.few;
  const many = itemsMessage.many;

  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: one,
                few: few,
                many: many,
              })} / ${numberFormat(sum)} ₽`
            : emptyMessage}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  itemsMessage: PropTypes.objectOf(string),
  emptyMessage: PropTypes.string
};

export default memo(BasketTool);
