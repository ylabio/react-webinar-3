import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import { Link } from "react-router-dom";
import './style.css';

function BasketTool(props) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('links')}>
        {props.page > 0 && <Link to={`/?page=${(props.page)}`}>{props.translate('main page')}</Link>}
      </div>
      <div className={cn('tools')}>
        <span className={cn('label')}>{props.translate('in cart')}:</span>
        <span className={cn('total')}>
          {props.amount
            ? `${props.amount} ${plural(props.amount, {
              one: props.translate('item'),
              few: props.translate('few items'),
              many: props.translate('many items')
            })} / ${numberFormat(props.sum)} ₽`
            : props.translate('empty')
          }
        </span>
        <button onClick={props.onOpen}>{props.translate('open')}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  page: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  translate: () => {},
  sum: 0,
  amount: 0,
  page: 0
}

export default memo(BasketTool);
