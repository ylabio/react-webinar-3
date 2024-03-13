import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import translate from "../../language/translate.json";
import {useLangContext} from "../../store/use-lang-context";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const {language} = useLangContext();
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate.InBasket[language]}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: `${translate.Good[language]}`,
            few: `${translate.FewGoods[language]}`,
            many: `${translate.ManyGoods[language]}`
          })} / ${numberFormat(sum)} ₽`
          : `${translate.Empty[language]}`
        }
      </span>
      <button onClick={onOpen}>{translate.ToBasket[language]}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
