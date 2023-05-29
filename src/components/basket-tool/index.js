import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import l from '../../languages/lang-rendering';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const emptyText = l('empty')
  const product = l('product')
  return (
    <div className={cn()}>
      <div>
        <span className={cn('label')}>{l('inBasket')}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, { one: product.one, few: product.few, many: product.many })} / ${numberFormat(sum)} ₽`
            : emptyText
          }
        </span>
        <button onClick={onOpen}>{l('buttonFollow')}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
