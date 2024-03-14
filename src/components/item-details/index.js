import {useCallback, useEffect, useState} from 'react';
import Basket from '../../app/basket';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../page-layout';
import Head from '../head';
import BasketTool from '../basket-tool';
import { useLocation } from 'react-router-dom';
import Item from '../item';

function ItemDetails() {

    const store = useStore();

    const location = useLocation()
  
    const [currentItem, setCurrentItem] = useState({})
  
    const select = useSelector(state => ({
      list: state.catalog.list,
      amount: state.basket.amount,
      sum: state.basket.sum
    }));
  
    const callbacks = {
      // Добавление в корзину
      addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
      // Открытие модалки корзины
      openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }
  
    const activeModal = useSelector(state => state.modals.name);
  
    useEffect(() => {
      const pathname = location.pathname;
      const state = location.state
      console.log(location.state)  
      if (pathname.includes('item')) {
        store.actions.modals.close('basket')
        fetch(`/api/v1/articles/${state}?fields=*,madeIn(title,code),category(title)`)
          .then(res => res.json())
          .then(data => setCurrentItem(data.result))
      }
    }, [location]);

    return (
        <>
            <PageLayout>
              <Head title={currentItem.title}/>
              <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
              <Item item={currentItem} onAdd={callbacks.addToBasket}/>
              {activeModal === 'basket' && <Basket/>}
            </PageLayout>
        </>
    )
}

export default ItemDetails