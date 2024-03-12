import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';

function BasketTool({ sum, amount, onOpen, locale }) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{locale.In_cart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: locale.product.one,
            few: locale.product.few,
            many: locale.product.many
          })} / ${numberFormat(sum)} ₽`
          : locale.empty
        }
      </span>
      <button onClick={onOpen}>{locale.Navigate}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  locale: PropTypes.object
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
