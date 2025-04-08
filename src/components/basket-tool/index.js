import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0, labels } = props;

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(
              amount,
              { one: labels.one, few: labels.few, many: labels.many }
            )} / ${numberFormat(sum)} ₽`
            : labels.empty}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  labels: PropTypes.shape({
    one: PropTypes.string,
    few: PropTypes.string,
    many: PropTypes.string,
    test: PropTypes.string,
  }).isRequired
};

export default memo(BasketTool);
