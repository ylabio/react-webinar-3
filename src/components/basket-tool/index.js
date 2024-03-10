import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { useLanguage } from "../../store/language-context";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const {Language, translations} = useLanguage();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/">{translations['mainPage']}</Link>
      <div className={cn('action')}>
        <span className={cn('label')}>{translations['inBasket']}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: translations['oneProduct'],
              few: translations['twoProducts'],
              many: translations['aLotOfProducts']
            })} / ${numberFormat(sum)} ₽`
            : translations['empty']
          }
        </span>
        <button onClick={onOpen}>{translations['proceed']}</button>
      </div>
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
