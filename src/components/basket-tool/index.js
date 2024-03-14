import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {lang as langData} from '../../lang/data'

function BasketTool({sum, amount, onOpen, lang}) {

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{langData.basketTool.title[lang]}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, langData.basketTool.items[lang], langData.basketTool.locale[lang])} / ${numberFormat(sum)} ₽`
          : `${langData.basketTool.empty[lang]}`
        }
      </span>
      <button onClick={onOpen}>{langData.basketTool.button[lang]}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
