import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { LanguageContext } from "../../store/language";
import translations from '../../store/language/translations.json';

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  const ln = useContext(LanguageContext).ln

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translations[ln].total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
