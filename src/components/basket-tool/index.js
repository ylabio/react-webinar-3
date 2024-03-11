import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, localeDict}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{localeDict.inCart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: localeDict.item.one,
            few: localeDict.item.few,
            many: localeDict.item.many
          })} / ${numberFormat(sum)} ₽`
          : localeDict.empty
        }
      </span>
      <button onClick={onOpen}>{localeDict.goTo}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
