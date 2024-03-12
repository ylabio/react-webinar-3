import React, {useCallback, useEffect} from "react";
import { useParams } from "react-router-dom";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemInfo from "../../components/item-info";
import ToolContainer from "../../components/tool-container";
import Navigation from "../../components/navigation";

function ProductItem() {
  
  const {itemId} = useParams();

  const store = useStore();

  useEffect(() => {
    store.actions.productItem.load(itemId);
  }, [])

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.lang,
    productItem: state.productItem.productItem
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(itemId), [store]),
    // Переключение языка
    toggleLang: useCallback(() => store.actions.lang.toggleLang(), [store]),
  }
  
  return (
    <PageLayout>
      <Head title={select.productItem.title} language={select.lang} onToggleLang={callbacks.toggleLang} />
      <ToolContainer>
        <Navigation language={select.lang} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} language={select.lang} />
      </ToolContainer>
      <ItemInfo item={select.productItem} language={select.lang} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default React.memo(ProductItem);