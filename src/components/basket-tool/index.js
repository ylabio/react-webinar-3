import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import MainMenu from "../main-menu";

function BasketTool({ sum, amount, onOpen, lang }) {
  const cn = bem('BasketTool');
  const isRus = lang === 'ru'
  return (
    <div className={cn()}>
      <MainMenu lang={lang}/>
      <div>
      {isRus
        ?
        <>
          <span className={cn('label')}>В корзине:</span>
          <span className={cn('total')}>
            {amount
              ? `${amount} ${plural(amount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров'
              })} / ${numberFormat(sum)} ₽`
              : `пусто`
            }
          </span>
          <button onClick={onOpen}>Перейти</button>
        </>
        :
        <>
          <span className={cn('label')}>In basket:</span>
          <span className={cn('total')}>
            {amount
              ? `${amount} ${plural(amount, {
                one: 'item',
                few: 'items',
                many: 'items'
              })} / ${numberFormat(sum)} ₽`
              : `empty`
            }
          </span>
          <button onClick={onOpen}>Watch</button>
        </>
      }
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
