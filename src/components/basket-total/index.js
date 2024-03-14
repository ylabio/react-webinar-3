import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { UI_TEXTS } from '../../consts/content';

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');

  const currentLanguage = document.documentElement.lang;
  const uiText = {
    totalSum: UI_TEXTS[currentLanguage].basket.total.totalSum,
  }

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{uiText.totalSum}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
