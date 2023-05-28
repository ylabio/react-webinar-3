import {memo, useCallback, useEffect} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import {Link} from 'react-router-dom';
import useTranslate from '../../hooks/useTranslate';
import './style.css';


function NavBlock() {

  const store = useStore();
  const _ = useTranslate();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <div className='NavBlock'>
      <Link to={'/'} className='NavBlock-link'>{_('toMainLink')}</Link>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
    </div>
  );
}

export default memo(NavBlock);
