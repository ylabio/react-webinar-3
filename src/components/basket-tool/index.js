import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import {LanguageContext} from '../../contexts';
import './style.css';

function BasketTool(props) {

  const translate = useContext(LanguageContext);

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate('В корзине:')}</span>
      <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, {
            one: translate('товар'),
            few: translate('товара'),
            many: translate('товаров')
          })} / ${numberFormat(props.sum)} ₽`
          : translate('пусто')
        }
      </span>
      <button onClick={props.onOpen}>{translate('Перейти')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
