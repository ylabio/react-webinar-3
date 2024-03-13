import {memo, useMemo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import ruTranslations from '../../translations/ru.json';
import enTranslations from '../../translations/en.json';

function BasketTotal({sum, lang}) {

  const cn = bem('BasketTotal');

  const language = lang === 'ru' ? ruTranslations : enTranslations;

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{language["basket.total"]}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  lang: PropTypes.string
};

BasketTotal.defaultProps = {
  sum: 0,
  lang: 'ru'
}

export default memo(BasketTotal);
