import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function BasketTotal({ sum, getPhrase }) {

  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{ getPhrase('cart', 'total', 'Cart total') }</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  getPhrase: PropTypes.func.isRequired,
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
