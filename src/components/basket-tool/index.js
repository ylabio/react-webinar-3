import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {translate} from '../../utils'


function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');


  return (
    <div className={cn()}>

      <div className={cn('cart')}>
        <span className={cn('label')}>{translate(lang, 'cart')}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${numberFormat(sum)} ₽`
            : translate(lang, 'пусто')
          }
        </span>
        <button onClick={onOpen}>{translate(lang, 'go')}</button>
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
