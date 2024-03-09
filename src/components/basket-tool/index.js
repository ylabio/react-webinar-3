import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import {LanguageContext} from '../../contexts';
import './style.css';

function BasketTool(props) {

  const tralslate = useContext(LanguageContext);

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{tralslate('В корзине:')}</span>
      <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, {
            one: tralslate('товар'),
            few: tralslate('товара'),
            many: tralslate('товаров')
          })} / ${numberFormat(props.sum)} ₽`
          : tralslate('пусто')
        }
      </span>
      <button onClick={props.onOpen}>{tralslate('Перейти')}</button>
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
