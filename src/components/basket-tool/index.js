import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import useTranslation from '../../hooks/translation-hook';
import useSelector from '../../store/use-selector';

function BasketTool(props) {
  const { onOpen = () => {} } = props;
  const translate = useTranslation();
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
                one: `${translate('product.one')}`,
                few: `${translate('product.few')}`,
                many: `${translate('product.many')}`,
              })} / ${numberFormat(select.sum)} ₽`
            : `${translate('basket.emptyBasket')}`}
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
