import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({ sum, amount, onOpen, getPhrase }) {

  const plurasList = getPhrase('cart', 'item', ['product', 'products', 'products',]);

  const cn = bem('BasketTool');
  
  return (
    <div className={cn()}>
      
        <span className={cn('label')}>{ getPhrase('cart', 'title', 'Cart') }:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {one: plurasList[0], few: plurasList[1], many: plurasList[2]})} / ${numberFormat(sum)} ₽`
            : getPhrase('cart', 'empty', 'empty')
          }
        </span>
        <button onClick={onOpen}>{ getPhrase('general', 'showCart', 'Show Cart') }</button>

    </div>
  );
}

BasketTool.propTypes = {
  getPhrase: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
