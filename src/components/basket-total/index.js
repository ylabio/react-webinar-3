import {memo} from "react";
import PropTypes from 'prop-types';
import useSelector from "../../store/use-selector";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');

  const language = useSelector(state => ({
    language: state.language.language,
    basketTextRu: {...state.language.ru.basket, ...state.language.ru.values},
    basketTextEn: {...state.language.en.basket, ...state.language.en.values},
  }));

  const text = language.language === "ru" ? language.basketTextRu : language.basketTextEn;

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{text.result}</span>
      <span className={cn('cell')}> {numberFormat(sum)} {text.currency}</span>
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
