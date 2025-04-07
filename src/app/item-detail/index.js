import React, {memo, useCallback, useEffect} from "react"
import Head from "../../components/head";
import ItemDetail from "../../components/item-detail";
import useSelector from '../../store/use-selector';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import { Link, useLoaderData } from "react-router";
import ItemDetailHeader from "../../components/item-detail-header";
import { useTranslation } from "../../store/language-provider";
import LanguageChanger from "../../components/language-changer";

function ItemDetailPage({children}){
    const store = useStore();
    
    const {result} = useLoaderData("item-detail");
      const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        item: state.itemState.item
      }));

    const {localeMessage , changeLang,lang} = useTranslation();
      
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

    return(
        <>
        <Head title={result.title}>
          <LanguageChanger lang={lang} changeLanguageMessage={localeMessage.changeLanguage} changeLang={changeLang} />  
        </Head>
        <ItemDetailHeader>
          <Link className="link" to={"/"}>{localeMessage.toHome}</Link>
          <BasketTool itemsMessage={localeMessage.items} emptyMessage={localeMessage.empty} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        </ItemDetailHeader>
        <ItemDetail madeInMessage={localeMessage.madeIn} categoryMessage={localeMessage.category} createdAtMessage={localeMessage.createdAt} priceMessage={localeMessage.price} buttonMessage={localeMessage.addButton} onAdd={callbacks.addToBasket} item={result}/>
        {children}
        </>
    )
}

export default memo(ItemDetailPage)

