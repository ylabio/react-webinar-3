import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from '../../utils';
import './style.css';

function BasketTool(props) {

  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{props.language.inBasket}:</span>
      <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, {
            one: props.language.productOne,
            few: props.language.productFew,
            many: props.language.productMany
          })} / ${numberFormat(props.sum)} ₽`
          : props.language.empty
        }
      </span>
      <button onClick={props.onOpen}>{props.language.follow}</button>
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
