import React, {memo, useCallback, useEffect} from "react"
import Head from "../../components/head";
import ItemDetail from "../../components/item-detail";
import useSelector from '../../store/use-selector';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import { Link, useLoaderData } from "react-router";
import { messages } from "../../messages";
import ItemDetailHeader from "../../components/item-detail-header";

function ItemDetailPage({children}){
    const store = useStore();
    
    const {result} = useLoaderData("item-detail");
      const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        lang: state.inter.lang,
        item: state.itemState.item
      }));

      const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

        addItemToStore: useCallback((result)=> store.actions.itemState.setItem(result),[store]),
      };
      
     useEffect(()=>{
      callbacks.addItemToStore(result);
     },[result])

    const toHomeMessage = messages[select.lang].toHome
    return(
        <>
        <Head title={result.title}/>
        <ItemDetailHeader>
          <Link className="link" to={"/"}>{toHomeMessage}</Link>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        </ItemDetailHeader>
        <ItemDetail onAdd={callbacks.addToBasket} item={result}/>
        {children}
        </>
    )
}

export default memo(ItemDetailPage)

