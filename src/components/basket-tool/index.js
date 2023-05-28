import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, localize}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{localize('inCart')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, localize('plural'))} / ${numberFormat(sum)} ₽`
          : localize('empty')
        }
      </span>
      <button onClick={onOpen}>{localize('toCart')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  localize: PropTypes.func
};

BasketTool.defaultProps = {
  onOpen: () => {},
  localize: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
