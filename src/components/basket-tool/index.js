<<<<<<< HEAD
import {memo, useCallback, useContext} from "react";
=======
import {memo} from "react";
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
<<<<<<< HEAD
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {Link} from "react-router-dom";
import {useLanguage} from "../../language-provider";

function BasketTool() {

  const { t } = useLanguage()

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store]);

  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <Link to='/'>{t('home')}</Link>
      <div className={cn('content')}>
        <span className={cn('label')}>{t('inBasket')}</span>
        <span className={cn('total')}>
        {select.amount
          ? `${select.amount} ${plural(select.amount, {
            one: t('oneProduct'),
            few: t('twoProducts'),
            many: t('otherProducts')
          })} / ${numberFormat(select.sum)} ₽`
          : t('empty')
        }
      </span>
        <button onClick={openModalBasket}>{t('go')}</button>
      </div>
=======

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
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
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
    </div>
  );
}

<<<<<<< HEAD
=======
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

>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
export default memo(BasketTool);
