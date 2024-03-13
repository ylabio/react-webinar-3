import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from 'react-router-dom';
import { UI_TEXTS } from '../../consts/content';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const currentLanguage = document.documentElement.lang;
  const uiText = {
    homeBtn: UI_TEXTS[currentLanguage].main.basketTool.homeBtn,
    inCart: UI_TEXTS[currentLanguage].main.basketTool.inCart,
    empty: UI_TEXTS[currentLanguage].main.basketTool.empty,
    toCartBtn: UI_TEXTS[currentLanguage].main.basketTool.toCartBtn,
    goods: UI_TEXTS[currentLanguage].main.basketTool.goods,
  }


  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <span className={cn('label')}>{uiText.inCart}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, uiText.goods)} / ${numberFormat(sum)} ₽`
          : `${uiText.empty}`
        }
      </span>
        <button onClick={onOpen}>{uiText.toCartBtn}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  language: PropTypes.string,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default BasketTool;
