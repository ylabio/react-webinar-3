import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import PageLayout from "../../components/page-layout";
import {memo, useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import CatalogItemInfo from "../../components/item-info";
import ItemSection from "../../components/item-info/itemInfoSection";

function ItemInfo() {
  const { id = '' } = useParams();
  const store = useStore();


  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.catalog.item,
  }));

  useEffect(() => {
    store.actions.catalog.getItemInfo(id);
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <CatalogItemInfo item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={select.item?.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ItemSection item={select.item} renderItem={renders.item} />

    </PageLayout>
  )
}

export default memo(ItemInfo);