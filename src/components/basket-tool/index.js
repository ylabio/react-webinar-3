import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool(props) {

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{props.textData.inBasket}</span>
      <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, {
            one: props.textData.one,
            few: props.textData.few,
            many: props.textData.many
          })} / ${numberFormat(props.sum)} ₽`
          : props.textData.empty
        }
      </span>
      <button onClick={props.onOpen}>{props.textData.button}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func,
  sum: PropTypes.number,
  amount: PropTypes.number,
  textData: PropTypes.exact({
    inBasket: PropTypes.string,
    empty: PropTypes.string,
    button: PropTypes.string,
    few: PropTypes.string,
    one: PropTypes.string,
    many: PropTypes.string,
  }).isRequired,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
