import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from 'react-router-dom';

function BasketTool(props) {
  const cn = bem('BasketTool');
  return (
    <div className='Main-page-and-BasketTool'>
      <div className='main-page'>
        <Link to="/">{props.main}</Link>
      </div>
      <div className={cn()}>
      <span className={cn('label')}>{props.label}:</span>
      <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, {
            one: props.one,
            few: props.few,
            many: props.many
          })} / ${numberFormat(props.sum)} ₽`
          : props.empty
        }
      </span>
      <button onClick={props.onOpen}>{props.buttonBasket}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  main: PropTypes.string,
  label: PropTypes.string,
  buttonBasket: PropTypes.string,
  one: PropTypes.string,
  few: PropTypes.string,
  many: PropTypes.string,
  empty: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
