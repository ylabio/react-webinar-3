import { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Info from '../../components/info';
import { useLocation } from "react-router-dom";

function InfoItem() {

  const store = useStore();
  const history = useLocation();

  useLayoutEffect(() => {
    store.actions.modals.close();
    const url = new URL(window.location.href);
    store.actions.catalog.loadOneItem(url.searchParams.get('item'));
  }, [history]);

  const select = useSelector(state => ({
    currentItem: state.catalog.currentItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
    country: state.catalog.country,
    category: state.catalog.category
  }));

  useEffect(() => {
    if (JSON.stringify(select.currentItem) !== '{}' ) {
      store.actions.catalog.loadCountryItem(select.currentItem.madeIn._id);
      store.actions.catalog.loadCategoryItem(select.currentItem.category._id);
    }
  }, [select.currentItem])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.currentItem.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />
      <Info item={select.currentItem} category={select.category} country={select.country} />
    </PageLayout>

  );
}

export default memo(InfoItem);