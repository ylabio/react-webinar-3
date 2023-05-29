import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import PageLayout from "../../components/page-layout";
import {memo, useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";
import useSelector from "../../store/use-selector";
import CatalogItemInfo from "../../components/item-info";
import Navigation from "../../components/navigation";
import NavMenu from "../../components/navigation-menu";

function ItemInfo({store}) {

  const { id = '' } = useParams();

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

  return (
    <PageLayout>
      <Head title={select.item?.title}/>
      <NavMenu>
        <Navigation/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </NavMenu>
      <CatalogItemInfo item={select.item} onAdd={callbacks.addToBasket}/>

    </PageLayout>
  )
}

export default memo(ItemInfo);