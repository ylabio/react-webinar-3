import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import { useLanguage } from '../../language-context';
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const { translate } = useLanguage();
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate('В корзине')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: translate('товар'),
            few: translate('товара'),
            many: translate('товаров')
          })} / ${numberFormat(sum)} ₽`
          : `${translate('пусто')}`
        }
      </span>
      <button onClick={onOpen}>{translate('Перейти')}</button>
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
