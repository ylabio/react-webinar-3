import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, translate, lang}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate('basketToolBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translate('basketToolProductVariants'), lang)} / ${numberFormat(sum)} ₽`
          : (translate('basketToolEmpty') || 'Пусто')
        }
      </span>
      <button onClick={onOpen}>{translate('basketToolButton')}</button>
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
