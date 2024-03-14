import {memo} from "react";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, basketToolText}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <NavLink to='/' relative="path" className={cn('nav')}>{basketToolText.navButton}</NavLink>
      <span className={cn('label')}>{basketToolText.basketText}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: `${basketToolText.basketCurrentOne}`,
            few: `${basketToolText.basketCurrentTwo}`,
            many: `${basketToolText.basketCurrentMany}`
          })} / ${numberFormat(sum)} ${basketToolText.currency}`
          : `${basketToolText.basketCurrentEmpty}`
        }
      </span>
      <button onClick={onOpen}>{basketToolText.basketButton}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  basketToolText: PropTypes.shape({
    currency: PropTypes.string,
    navButton: PropTypes.string,
    basketText: PropTypes.string,
    basketCurrentOne: PropTypes.string,
    basketCurrentTwo: PropTypes.string,
    basketCurrentMany: PropTypes.string,
    basketCurrentEmpty: PropTypes.string,
    basketButton: PropTypes.string,
  }).isRequired,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
