import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { langButton, langText, pluralOptions } from "../../constants/language";

function BasketTool(props) {
const {sum, amount, onOpen,language='ru'} = props

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{langText.SHOPPING_CART[language][1]}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, pluralOptions[language])} / ${numberFormat(sum)} ₽`
          : (`${langText.EMPTY[language]}`)
        }
      </span>
      <button onClick={onOpen}>{langButton.OPEN[language]}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,

}

export default memo(BasketTool);
