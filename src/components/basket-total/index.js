import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import translate from "../../app/language/translate.json";
import {useLangContext} from "../../store/use-lang-context";
import './style.css';

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  const {language} = useLangContext();
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translate.Total[language]}</span>
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
