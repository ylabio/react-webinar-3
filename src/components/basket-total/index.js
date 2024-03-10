import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { langData } from "../../store/language/langData";

function BasketTotal({sum, language}) {
  const cn = bem('BasketTotal');

  const translations = {
    total: langData[language].total
  }

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translations.total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  language: PropTypes.string
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
