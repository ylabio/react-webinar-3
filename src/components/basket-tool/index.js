import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool(props) {

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${numberFormat(props.sum)} ₽`
          : `пусто`
        }
      </span>
      <button onClick={props.onOpen}>Перейти</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
