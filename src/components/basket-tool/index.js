import React, {memo, useCallback, useEffect} from "react";
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {Link} from "react-router-dom";
import {useLanguage} from "../../LanguageContext";

function BasketTool() {
  const cn = bem('BasketTool');

  const store = useStore();
  const {tr} = useLanguage()


  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  // Открытие модалки корзины
  const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store])


  return (
    <div className={cn()}>
      <Link to={'/'}>{tr('home')}</Link>
      <div className={cn('content')}>
        <span className={cn('label')}>{tr('inTheBasket')}:</span>
        <span className={cn('total')}>
        {select.amount
          ? `${select.amount} ${plural(select.amount, {
            one: tr('oneProduct'),
            few: tr('fewProduct'),
            many: tr('manyProduct')
          })} / ${numberFormat(select.sum)} ₽`
          : tr('empty')
        }
      </span>
        <button onClick={openModalBasket}>{tr('goBtn')}</button>
      </div>
    </div>
  );
}

export default memo(BasketTool);
