import React, {memo, useCallback} from "react"
import Head from "../../components/head";
import ItemDetail from "../../components/item-detail";
import useSelector from '../../store/use-selector';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import Basket from '../basket/index';
import "./style.css"
import { Link, useLoaderData } from "react-router";
import { messages } from "../../messages";

export default function ItemPage(){
    const activeModal = useSelector(state => state.modals.name);
    return(

      <ItemDetailPage>{activeModal === 'basket' && <Basket/>}</ItemDetailPage>
    );
};


const ItemDetailPage = memo(function ItemDetailPage({children}){
    const store = useStore();

    const {result} = useLoaderData("item-detail");
      const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        lang: state.inter.lang,
      }));

      const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
      };
    
    const toHomeMessage = messages[select.lang].toHome
    return(
        <>
        <Head title={result.name}/>
        <div className="ItemPage-main">
        <Link className="link" to={"/"}>{toHomeMessage}</Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        </div>
        <ItemDetail onAdd={callbacks.addToBasket} item={result}/>
        {children}
        </>
    )
})


export async function loader({params}){
    const id = params.itemId
    const response = await fetch(`/api/v1/articles/`+ id);
    if(!response.ok){
        throw new Response(JSON.stringify({message: 'Could not fetch item detail', }))
    }else{
        const json = await response.json();
        return json;
    }
}
