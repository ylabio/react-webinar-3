import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, translate}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div>
        <span className={cn('label')}>{translate('in-cart') ?? 'В корзине:'}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${translate('product', amount) ?? plural(amount, {one:'товар', few:'товара', many:'товаров'})} / ${numberFormat(sum)} ₽`
            : translate('empty') ?? `пусто`
          }
        </span>
        <button onClick={onOpen}>{translate('go-to') ?? 'Перейти'}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translate: PropTypes.func
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  translate: () => null
}

export default memo(BasketTool);
