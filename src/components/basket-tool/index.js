import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from 'react-router-dom';
import {localization} from '../../localization';

function BasketTool(props) {

  const cn = bem('BasketTool');

  const local = localization.basketTool;

  return (
    <div className={cn()}>
      <Link className={cn('link')} to={'/'}>{localization.link.mainPage[props.language]}</Link>
      <div className={cn('wrapper')}>
        <span className={cn('label')}>{local.inBasket[props.language]}</span>
        <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, {
            one: `${local.one[props.language]}`,
            few: `${local.few[props.language]}`,
            many: `${local.many[props.language]}`,
          })} / ${numberFormat(props.sum)} ${localization.currency.rub[props.language]}`
          : local.empty[props.language]
        }
      </span>
        <button onClick={props.onOpen}>{local.toBasket[props.language]}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  localization: PropTypes.object,
  language: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
