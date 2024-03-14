import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function BasketTotal({sum, basketText}) {
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{basketText.result}</span>
      <span className={cn('cell')}> {numberFormat(sum)} {basketText.currency}</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  basketText: PropTypes.shape({
    result: PropTypes.string,
    currency: PropTypes.string,
  }).isRequired,
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
