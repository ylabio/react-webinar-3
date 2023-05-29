import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { LanguageContext } from "../../store/language";
import translations from '../../store/language/translations.json'

function BasketTool({sum, amount, onOpen}) {
  const ln = useContext(LanguageContext).ln
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translations[ln].basket}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, ln)} / ${numberFormat(sum)} ₽`
          : `${translations[ln].empty}`
        }
      </span>
      <button className={cn('follow')} onClick={onOpen}>{translations[ln].follow}</button>
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
