import React, { useCallback, useEffect } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Navbar from "../../components/navbar";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/hooks/use-store";
import useSelector from "../../store/hooks/use-selector";
import ItemCard from "../../components/item-card";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import { useTranslateContext } from "../../contexts/translate-context";
import LangSelector from "../../components/lang-selector";

function ItemInfo() {
  const { itemId } = useParams();

  const store = useStore();

  const { translate, currentLocale, constructOptionsByLocale, changeLang } =
    useTranslateContext();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.catalog.currentProduct,
    mainPage: state.catalog.currentPage,
    productIsLoading: state.catalog.productIsLoading,
  }));

  useEffect(() => {
    store.actions.catalog.loadFullProductData(itemId);

    return () => {
      store.actions.catalog.setProductIsLoading();
    };
  }, [itemId]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),

    translate: useCallback(
      (resourseKey) => translate(resourseKey),
      [translate]
    ),

    constructOptionsByLocale: useCallback(
      (valueName) => constructOptionsByLocale(valueName),
      [constructOptionsByLocale]
    ),

    changeLang: useCallback(
      (event) => changeLang(event.target.value),
      [changeLang, currentLocale]
    ),
  };

  return (
    <PageLayout>
      {!select.productIsLoading ? (
        <>
          <Head title={select.item.title}>
            <LangSelector
              optionsList={["ru", "en"]}
              onCange={callbacks.changeLang}
              defaultValue={currentLocale}
            />
          </Head>
          <Navbar
            navList={[
              {
                name: translate("main-page"),
                path: `/page/${select.mainPage}`,
              },
            ]}
          >
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
              t={callbacks.translate}
              optionsConstructor={callbacks.constructOptionsByLocale}
              locale={currentLocale}
            />
          </Navbar>
          <ItemCard
            item={select.item}
            onAdd={callbacks.addToBasket}
            t={callbacks.translate}
          />
        </>
      ) : (
        <Loader />
      )}
    </PageLayout>
  );
}

export default React.memo(ItemInfo);
