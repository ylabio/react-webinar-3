import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { LanguageContext } from "../../languageContext";
import jsonText from './text.json'

function BasketTotal({sum}) {

  const [language, setLanguage] = useContext(LanguageContext)

  const cn = bem('BasketTotal');

  const text = jsonText;

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{text[language]}</span>
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
