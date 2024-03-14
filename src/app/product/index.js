import { memo, useEffect, useState, useCallback } from "react";
import PageLayout from "../../components/page-layout";
import Preloader from "../../components/preloader";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import ItemContent from "../../components/item-content"

function Product() {
  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.actions.product.setLoading(true);
    store.actions.product.load(params.itemId);
    store.actions.modals.close("basket");
  }, [params.itemId]);

  const select = useSelector((state) => ({
    data: state.product.data || {},
    isLoading: state.product.isLoading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItemsCount: state.catalog.totalItemsCount,
    t: state.i18n.translations[state.i18n.lang],
    currentLang: state.i18n.lang,
    supportedLangs: state.i18n.supportedLangs
  }));

  const callbacks = {
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onLangeChange: useCallback((e) => {
      return store.actions.i18n.setLang(e.target.value)
    }, [store])
  };

  return (
    <PageLayout>
      <Preloader isLoading={select.isLoading}>
        <Head
          title={select.data.title}
          lang={select.currentLang}
          supportedLangs={select.supportedLangs}
          onLangChange={callbacks.onLangeChange}
        />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          t={select.t}
        />
        <ItemContent t={select.t} data={select.data} onAdd={callbacks.addToBasket}/>
      </Preloader>
    </PageLayout>
  );
}

export default memo(Product);
