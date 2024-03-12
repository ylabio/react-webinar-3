import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import useSelector from "../../store/use-selector";

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  const {total} = useSelector(state => state.locale.translations.basket);
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
