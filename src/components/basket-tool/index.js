import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0, main = 'Заголовок', onMain = () => {} } = props;

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('link')} onClick={() => onMain()}>
        {main}
      </div>
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
  onMain: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  main: PropTypes.string,
};

export default memo(BasketTool);
