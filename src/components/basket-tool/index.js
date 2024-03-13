import {memo,useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { LanguageContext } from "../../languages/languagesContext";

function BasketTool({sum, amount, onOpen}) {

  let { dict } = useContext(LanguageContext)

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{dict.basketInfo}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: `${dict.product}`,
            few: `${dict.productsFew}`,
            many: `${dict.products}`
          })} / ${numberFormat(sum)} ₽`
          : `${dict.empty}`
        }
      </span>
      <button onClick={onOpen}>{dict.go}</button>
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
