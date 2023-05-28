import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural, translate} from "../../utils";
import {LanguageContext} from "../../store/context";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const activeLanguage = useContext(LanguageContext)

  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate('inCart', activeLanguage)}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: translate('product', activeLanguage).one,
            few: translate('product', activeLanguage).few,
            many: translate('product', activeLanguage).many})} / ${numberFormat(sum)} ₽`
          : translate('empty', activeLanguage)
        }
      </span>
      <button onClick={onOpen}>{translate('goToCart', activeLanguage)}</button>
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
