import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { useLanguage } from "../../languageContext";

function NavBar({sum, amount, onOpen}) {
  const cn = bem('NavBar');
  const {tr} = useLanguage()
  return (
    <div className={cn()}>
      <div className={cn('home')}>
        <Link to="/">{tr('home')}</Link>
      </div>
      <div className={cn('basketTools')}>
        <span className={cn('label')}>{tr('inTheBasket')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: tr('oneProduct'),
              few: tr('fewProduct'),
              many: tr('manyProduct')
            })} / ${numberFormat(sum)} ₽`
            : `${tr('empty')}`
          }
        </span>
        <button onClick={onOpen}>{tr('goBtn')}</button>
      </div>
      
    </div>
  );
}

NavBar.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

NavBar.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(NavBar);
