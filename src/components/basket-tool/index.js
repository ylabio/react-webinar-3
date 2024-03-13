import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import MainMenu from "../main-menu";


function BasketTool({ sum, amount, onOpen, language }) {
  const cn = bem('BasketTool');
  const { goTo, inBasket, empty, pluralForms, main } = language;
  const { one, few, many } = pluralForms;
  const formattedAmountSummary = amount
    ? `${amount} ${plural(amount, { one, few, many })} / ${numberFormat(sum)} ₽`
    : `${empty}`;
  return (
    <div className={cn()}>
      <MainMenu main={main} />
      <span className={cn('label')}>{inBasket}</span>
      <span className={cn('total')}>{formattedAmountSummary}</span>
      <button onClick={onOpen}>{goTo}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.shape({
    goTo: PropTypes.string.isRequired,
    inBasket: PropTypes.string.isRequired,
    empty: PropTypes.string.isRequired,
    pluralForms: PropTypes.shape({
      one: PropTypes.string.isRequired,
      few: PropTypes.string.isRequired,
      many: PropTypes.string.isRequired,
    }).isRequired,
    main: PropTypes.string.isRequired,
  }).isRequired,
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
}

export default memo(BasketTool);
