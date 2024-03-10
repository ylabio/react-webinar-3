import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, translator}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{`${translator.dictionary.cart.inCart}:`}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: translator.dictionary.cart.plural.one,
            few: translator.dictionary.cart.plural.few,
            many: translator.dictionary.cart.plural.many
          })} / ${numberFormat(sum)} ₽`
          : translator.dictionary.cart.empty
        }
      </span>
      <button onClick={onOpen}>{translator.dictionary.controls.openCart}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translator: PropTypes.object
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
