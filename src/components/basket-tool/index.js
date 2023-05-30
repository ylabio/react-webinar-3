import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool(props) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn("label")}> {props.texts.inBasket}:</span>
      <span className={cn("total")}>
        {props.amount
          ? `${props.amount} ${plural(props.amount,props.texts.productPlural)} / ${numberFormat(props.sum)} ₽`
          : props.texts.empty
        }
      </span>
      <button onClick={props.onOpen}> {props.texts.open}</button>
    </div>
  );
}

BasketTool.propTypes = {
  texts: PropTypes.shape({
    inBasket: PropTypes.string,
    empty: PropTypes.string,
    productPlural: PropTypes.object,
    open: PropTypes.string,
  }),
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
