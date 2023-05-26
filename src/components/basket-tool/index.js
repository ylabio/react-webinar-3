import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, inBasketTitle, goToBasketTitle, emptyBasketTitle, amountPlural}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{inBasketTitle}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${amountPlural} / ${numberFormat(sum)} ₽`
          : emptyBasketTitle
        }
      </span>
      <button onClick={onOpen}>{goToBasketTitle}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  inBasketTitle: PropTypes.string.isRequired,
  goToBasketTitle: PropTypes.string.isRequired,
  emptyBasketTitle: PropTypes.string.isRequired,
  amountPlural: PropTypes.string.isRequired
};

BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
