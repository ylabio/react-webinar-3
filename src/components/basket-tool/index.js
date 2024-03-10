import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool(props) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('links')}>
        {props.children}
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
  link: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }),
};

BasketTool.defaultProps = {
  onOpen: () => {},
  translate: () => {},
  sum: 0,
  amount: 0,
  children: PropTypes.node,
}

export default memo(BasketTool);
