import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { NavLink, useLocation } from "react-router-dom";
import { languageConfig } from "../../languages";
import useSelector from '../../store/use-selector';
import Navigation from "../navigation";

function BasketTool({sum, amount, onOpen}) {
  const language = useSelector(state => state.language.language);
  const label = language === 'RU' ? languageConfig.cart.rus : languageConfig.cart.eng;
  const empty = language === 'RU' ? languageConfig.empty.rus : languageConfig.empty.eng;
  const pieces = language === 'RU' ? languageConfig.pieces.rus : languageConfig.pieces.eng;
  const goLabel = language === 'RU' ? languageConfig.go.rus : languageConfig.go.eng;

  const location = useLocation();
  const cn = bem('BasketTool');
  return (
    <div className={location.pathname ==='/' ? cn('main') : cn()}>
      <Navigation />
      <div>
        <span className={cn('label')}>{`${label}:`}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {one:pieces.one, few:pieces.few, many:pieces.many})} / ${numberFormat(sum)} ₽`
            : empty
          }
        </span>
        <button onClick={onOpen}>{goLabel}</button>
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
