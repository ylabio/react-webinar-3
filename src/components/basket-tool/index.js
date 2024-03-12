import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function BasketTool({ sum, amount, onOpen, language }) {
  const { goTo, inBasket, empty, forPlural, main } = language;
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link className={cn('link')} to='/' >{main}</Link>
      <span className={cn('label')}>{inBasket}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: forPlural.one,
            few: forPlural.few,
            many: forPlural.many,
          })} / ${numberFormat(sum)} ₽`
          : `${empty}`
        }
      </span>
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
    forPlural: PropTypes.shape({
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
